import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, ManyToOne, OneToOne } from "typeorm"
import { User } from "./User"
import { EntityBasics } from "./Entity"
import { Adress } from "./Adress"

@Entity({name:"libraries"})
export class Library extends EntityBasics {
    @Column()
    name: string

    @ManyToOne(()=>User,(user)=>user.libraries, {onDelete: "NO ACTION"})
    user: User

    @OneToOne(()=>Adress,(adress)=>adress.library, {onDelete: "NO ACTION", nullable:true})
    adress: Adress

    @Column({default: 'public'})
    visibility: string
}
