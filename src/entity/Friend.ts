import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, ManyToMany, JoinTable} from "typeorm";

import { User } from "./User";
@Entity()
export class Friend{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    user_name: string
    @Column()
    friend_name: string
   @ManyToMany(()=>User, {cascade: true})
   @JoinTable()
   user:User[]
}