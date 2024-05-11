import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, OneToMany } from "typeorm"
import { Library } from "./Library"

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

    @OneToMany(()=>Library, (library)=>library.user, {eager:true})
    library: Library[]
}
