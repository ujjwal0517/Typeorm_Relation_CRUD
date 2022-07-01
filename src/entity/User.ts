import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Comment } from "./Comment"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number
    @Column()
    email: string

    @Column()
    password: string
    
}
