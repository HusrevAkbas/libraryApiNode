import { Entity, PrimaryGeneratedColumn, Column, TableInheritance } from "typeorm"

@Entity({name:"users"})
@TableInheritance({ column: { type: "varchar", name: "type" } })
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
