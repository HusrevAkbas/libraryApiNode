import { Entity, Column, TableInheritance, OneToMany, BeforeInsert, ManyToMany, Tree } from "typeorm"
import { Library } from "./Library"
import { Shelfitem } from "./Shelfitem"
import * as bcrypt from "bcrypt"
import { EntityBasics } from "./Entity"
import { Adress } from "./Adress"
import { Activity } from "./Activity"

@Entity({name:"users"})
@TableInheritance({ column: { type: "varchar", name: "type", default: "PersonalUser" } })
export class User extends EntityBasics {

    @Column({nullable: false, unique: true})
    email: string

    @Column({nullable: false})
    password: string

    @Column({nullable: false, unique: true})
    username: string

    @Column({default: true})
    status: boolean

    @Column({default:"USER", nullable:true})
    role: string

    @OneToMany(()=>Library, (library)=>library.user,{nullable: true})
    libraries: Library[]

    @OneToMany(()=>Shelfitem, (shelfitem)=>shelfitem.user,{nullable:true})
    shelfitems: Shelfitem[]

    @OneToMany(()=>Adress, (adress)=>adress.user,{nullable:true})
    adresses: Adress[]

    @OneToMany(()=>Activity,(act)=>act.senderUser,{nullable:true})
    createdActivities: Activity []

    @ManyToMany(()=>Activity, (activity)=>activity.participants,{nullable:true})
    participatedActivities: Activity []

    @BeforeInsert()
    async hashPassword (){
        this.password = await bcrypt.hash(this.password, 10)
    }
}
