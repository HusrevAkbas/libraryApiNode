import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name:"users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    username: string

    @Column()
    profileImgUrl: string

    @Column()
    status: boolean

    @Column()
    role: string
}
