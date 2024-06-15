import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, ManyToOne, OneToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { EntityBasics } from "./Entity"
import { Adress } from "./Adress"
import { Shelfitem } from "./Shelfitem"

@Entity({name:"libraries"})
export class Library extends EntityBasics {
    @Column()
    name: string

    @Column({default: 'public'})
    visibility: string

    @ManyToOne(()=>User,(user)=>user.libraries, {onDelete: "NO ACTION"})
    user: User

    @OneToOne(()=>Adress,(adress)=>adress.library, {onDelete: "NO ACTION", nullable:true})
    adress: Adress

    @OneToMany(()=>Shelfitem,(shelfitem)=>shelfitem.library,{nullable: true})
    shelfitems: Shelfitem[]
}
