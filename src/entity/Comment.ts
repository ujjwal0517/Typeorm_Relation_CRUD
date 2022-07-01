import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, ManyToOne} from "typeorm";

import { User } from "./User";
@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    comment: string
    @CreateDateColumn()
    createdAt: Date
    @ManyToOne(()=>User)
    user: User
}