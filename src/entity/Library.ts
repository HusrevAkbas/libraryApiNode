import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, ManyToOne } from "typeorm"
import { User } from "./User"
import { EntityBasics } from "./Entity"

@Entity({name:"libraries"})
export class Library extends EntityBasics {

    @ManyToOne(()=>User,(user)=>user.library, {onDelete: "NO ACTION"})
    user: User

    @Column()
    adress: string

    @Column()
    visibility: string
}
