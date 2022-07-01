import {Request, Response} from 'express'
import { AppDataSource } from '../data-source'
import { Profile } from '../entity/Profile'
import {User} from '../entity/User'
export class profileController{
static createProfile = async(req:Request, res:Response)=>{
    const userId = Number(req.params.id)
   const  user = await AppDataSource.getRepository(User).findOneBy({id:userId})
   if(user){

       const newProfile = {
           first_name: req.body.first_name,
           last_name: req.body.last_name,
           phone: req.body.phone,
           user: user
       }
       const result = await AppDataSource.getRepository(Profile).save(newProfile)
       res.json({message:"Profile Created Successfully", data:newProfile})
   }else{

       res.status(404).json({message:"User Not found to create Profile"})
   }

}
static getAllProfile = async(req:Request, res:Response)=>{
    const result = await AppDataSource.getRepository(Profile).find()
    res.json(result)
}
static getUserProfile = async(req:Request, res:Response)=>{
    const userId = Number(req.params.id)
    const user = await AppDataSource.getRepository(User).findOneBy({id:userId})

    const result = await AppDataSource.getRepository(Profile).findOneBy({user:user})
    res.json(result)
}
static updateProfile = async( req:Request, res:Response)=>{
    const profileId = Number(req.params.Cid)
    const userId = Number(req.params.id);
    try{
        const user = await AppDataSource.getRepository(User).findOneBy({id:userId})
       
        if(user){

            const existingProfileOfUser = await AppDataSource.getRepository(Profile).findOneBy({user:user, P_id:profileId})
            if(existingProfileOfUser){

                const updatedProfile = req.body
                const profile = {...existingProfileOfUser, ...updatedProfile}
                    
                    const result = await AppDataSource.getRepository(Profile).save(profile)
                    res.json(result)
            }else{
                res.json('Profile not found')
            }
        }else{
            res.status(404).json("user Not found")
        }
      
    }
    catch(err){
        res.json(err.message)
    }
  
}
static deleteProfile = async(req:Request, res:Response)=>{
    const profileId = Number(req.params.Pid)
    const userId = Number(req.params.id);
    try{
        
        const user = await AppDataSource.getRepository(User).findOneBy({id:userId})
        const existingProfileOfUser = await AppDataSource.getRepository(Profile).findOneBy({user:user, P_id:profileId})
        if(existingProfileOfUser){

            const commentTodelete = await AppDataSource.getRepository(Profile).delete({user:user, P_id:profileId})
           
            res.json({message:"Profile Deleted successfully"})
        }else{
            res.status(404).json("Profile Not Found")
        }
    }catch(err){
        console.log(err.message)
    }
}
}