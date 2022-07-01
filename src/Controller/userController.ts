import {Request, Response} from 'express'
import { AppDataSource } from '../data-source'
import {User} from '../entity/User'
export class userController{
 static  createuser = async(req:Request, res:Response)=>{
    const newUser = {
        email: req.body.email,
        password: req.body.password
    }
    const result = await AppDataSource.getRepository(User).save(newUser)
    res.json({
        data: result,
        message:"User Created Successfully"
    })
 }
 static getAllUser = async(req:Request, res:Response)=>{
    const result = await AppDataSource.getRepository(User).find()

    res.json(result)
 }
 static getUserById = async(req:Request, res:Response)=>{
    const id  = Number(req.params.id)
    const result = await AppDataSource.getRepository(User).findOneBy({id:id})
    res.json(result)
 }
 static updateUser = async(req:Request, res:Response)=>{
    const id = Number(req.params.id)
    const existingUser = await AppDataSource.getRepository(User).findOneByOrFail({id:id})
    const updatedUsed = req.body
    const result = {...existingUser, ...updatedUsed}
    await AppDataSource.getRepository(User).save(result)
    res.json({message:"User details Updated Successfully",
    data: result
    })
 }
 static removeUser = async(req:Request , res:Response)=>{
    const id = Number(req.params.id)
    const result = await AppDataSource.getRepository(User).delete(id)
    res.json("User Account Deleted successfully")
 }
}