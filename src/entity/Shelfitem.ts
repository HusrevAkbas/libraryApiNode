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

    @Column({nullable:true})
    imgUrl: string

    @ManyToOne(()=>User, {nullable: false, onDelete:"CASCADE"})
    user: User

    @ManyToOne(()=>Library,{nullable: false, onDelete: "NO ACTION"})
    library: Library

    @Column({default :true})
    status: boolean
}