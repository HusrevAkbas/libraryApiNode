import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, ManyToOne } from "typeorm"
import { User } from "./User"
import { Library } from "./Library"

@Entity({name:"shelfitems"})
@TableInheritance({ column: { type: "varchar", name: "type", default: "Book" } })
export class Shelfitem {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column()
    imgUrl: string

    @ManyToOne(()=>User, {eager:true})
    user: User

    @ManyToOne(()=>Library,{eager:true})
    library: Library

    @Column({default :true})
    status: boolean
}