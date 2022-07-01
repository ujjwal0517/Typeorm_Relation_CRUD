import {Request, Response} from 'express'
import { userInfo } from 'os'
import { AppDataSource } from '../data-source'
import { Friend } from '../entity/Friend'
import {User} from '../entity/User'
export class friendController{
static createfriend = async(req:Request, res:Response)=>{
    const userId = Number(req.params.id)
    const user2Id = Number(req.params.fid)
   const  user = await AppDataSource.getRepository(User).findOneBy({id:userId})
   const user2 = await AppDataSource.getRepository(User).findOneBy({id:user2Id})
   const userCollection = [user, user2]
   console.log(userCollection)
   if(user != user2){

       const newFriend = {
           user_name: user.email,
           friend_name: user2.email,
           user: [user, user2]
       }
       const newfriend = await AppDataSource.getRepository(Friend).create(newFriend)
       const result = await AppDataSource.getRepository(Friend).save(newfriend)
       if(result.user === userCollection){
        res.json("Already a Friend")
       }else{

              res.json({message:"Friend Created Successfully", data:newFriend})
       }
   }else{

       res.status(404).json({message:"Same user cannot be to make friend"})
   }

}

static getAllFriend = async(req:Request, res:Response)=>{
    const userId = Number(req.params.id)
    const user = await AppDataSource.getRepository(User).findOneBy({id:userId})
    const result = await AppDataSource.getRepository(Friend).findBy({user:user})
    res.json(result)
}
static removeFriend = async(req:Request, res:Response)=>{
    const friendId = Number(req.params.fid)
    const userId = Number(req.params.id);
    try{
        
        const user = await AppDataSource.getRepository(User).findOneBy({id:userId})
        const existingfriendOfUser = await AppDataSource.getRepository(Friend).findOneBy({user:user, id:friendId})
        if(existingfriendOfUser){

            const commentTodelete = await AppDataSource.getRepository(Friend).delete({user:user, id:friendId})
           
            res.json({message:"Friend removed successfully"})
        }else{
            res.status(404).json("Friend Not Found")
        }
    }catch(err){
        console.log(err.message)
    }
}
}