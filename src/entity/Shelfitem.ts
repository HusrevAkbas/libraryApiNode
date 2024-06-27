import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"
import { Library } from "./Library"
import { EntityBasics } from "./Entity"

@Entity({name:"shelfitems"})
@TableInheritance({ column: { type: "varchar", name: "type", default: "Book" } })
export class Shelfitem extends EntityBasics {

    @ManyToOne(()=>Library,{onDelete: "NO ACTION"})
    @JoinColumn()
    library: Library

    @Column()
    name: string
}