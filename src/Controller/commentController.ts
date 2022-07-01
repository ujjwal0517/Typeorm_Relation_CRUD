import { AppDataSource } from "../data-source";
import {Request, Response} from "express"
import { Comment } from "../entity/Comment";
import { User } from "../entity/User";

export class commentController{
  
    static createData = async (req: Request, res:Response)=>{
        const userId = Number(req.params.id)
        const user = await AppDataSource.getRepository(User).findOneBy({id:userId})
        const newComment = {
            comment: req.body.comment,
            user:user
        }
        try{
            
           
            const result = await AppDataSource.getRepository(Comment).save(newComment)
            res.json({data:result, message: "Commented Successfully"})
        }catch(err){
            res.json({message:err.message})
        }
    }
    static getAllComment =async (req:Request, res:Response)=>{
        try{

            const result =await AppDataSource.getRepository(Comment).find()
            res.json(result)
        }catch(err){
            res.json({message:err.message})
        }
    }
    static getCommentById = async (req:Request, res:Response)=>{
        const id = Number(req.params.id);
        try{
            const user = await AppDataSource.getRepository(User).findOneBy({id:id})
            if(user){
                const result = await AppDataSource.getRepository(Comment).findBy({user})
                res.json(result)
            }else{
                res.status(404).json("User Not found")
            }
        }catch(err){
            res.json(err.message)
        }
    }
    static updateComment = async( req:Request, res:Response)=>{
        const commentId = Number(req.params.Cid)
        const userId = Number(req.params.id);
        try{
            const user = await AppDataSource.getRepository(User).findOneBy({id:userId})
           
            if(user){

                const existingCommentOfUser = await AppDataSource.getRepository(Comment).findOneBy({user:user, id:commentId})
                if(existingCommentOfUser){

                    const updatedComment = req.body
                    const comment = {...existingCommentOfUser, ...updatedComment}
                        
                        const result = await AppDataSource.getRepository(Comment).save(comment)
                        res.json(result)
                }else{
                    res.json('Comment not found')
                }
            }else{
                res.status(404).json("user Not found")
            }
          
        }
        catch(err){
            res.json(err.message)
        }
      
    }
    static deleteComment = async(req:Request, res:Response)=>{
        const commentId = Number(req.params.Cid)
        const userId = Number(req.params.id);
        try{
            
            const user = await AppDataSource.getRepository(User).findOneBy({id:userId})
            const existingCommentOfUser = await AppDataSource.getRepository(Comment).findOneBy({user:user, id:commentId})
            if(existingCommentOfUser){

                const commentTodelete = await AppDataSource.getRepository(Comment).delete({user:user, id:commentId})
               
                res.json({message:"Comment Deleted successfully"})
            }else{
                res.status(404).json("Comment Not Found")
            }
        }catch(err){
            console.log(err.message)
        }
    }
   

}