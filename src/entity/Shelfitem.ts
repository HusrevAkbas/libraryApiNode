import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, ManyToOne } from "typeorm"
import { User } from "./User"
import { Library } from "./Library"
import { EntityBasics } from "./Entity"

@Entity({name:"shelfitems"})
@TableInheritance({ column: { type: "varchar", name: "type", default: "Book" } })
export class Shelfitem extends EntityBasics {

    @ManyToOne(()=>User, {nullable: true, onDelete:"NO ACTION"})
    user: User

    @ManyToOne(()=>Library,{nullable: true, onDelete: "NO ACTION"})
    library: Library
}