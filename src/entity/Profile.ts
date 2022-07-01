import { Entity, Column, PrimaryGeneratedColumn , CreateDateColumn, OneToOne, JoinColumn} from "typeorm";

import { User } from "./User";
@Entity()
export class Profile{
    @PrimaryGeneratedColumn()
    P_id:number
    @Column()
    first_name: string
    @Column()
    last_name: string
    @Column()
    phone: number
    @CreateDateColumn()
    createdAt: Date
    @OneToOne(()=>User, {cascade: true})
    @JoinColumn()
    user: User
}