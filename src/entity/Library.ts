import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity({name:"libraries"})
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Library {
    
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>User,(user)=>user.library)
    user: User

    @Column()
    name: string

    @Column()
    adress: string

    @Column()
    imgUrl: string

    @Column()
    status: boolean

    @Column()
    visibility: string
}
