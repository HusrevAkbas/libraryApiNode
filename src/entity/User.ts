import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, OneToMany, JoinColumn, BeforeInsert } from "typeorm"
import { Library } from "./Library"
import { Shelfitem } from "./Shelfitem"
import * as bcrypt from "bcrypt"
import { EntityBasics } from "./Entity"
import { Adress } from "./Adress"

@Entity({name:"users"})
@TableInheritance({ column: { type: "varchar", name: "type", default: "PersonalUser" } })
export class User extends EntityBasics {

    @Column({nullable: false, unique: true})
    email: string

    @Column()
    password: string

    @Column({nullable: false, unique: true})
    username: string

    @Column({nullable:true})
    profileImgUrl: string

    @Column({default: true})
    status: boolean

    @Column({default:"USER", nullable:true})
    role: string

    @OneToMany(()=>Library, (library)=>library.user, {eager:true})
    libraries: Library[]

    @OneToMany(()=>Shelfitem, (shelfitem)=>shelfitem.user, {eager: true})
    shelfitems: Shelfitem[]

    @OneToMany(()=>Adress, (adress)=>adress.user,{nullable:true,eager:true})
    adresses: Adress[]

    @BeforeInsert()
    async hashPassword (){
        this.password = await bcrypt.hash(this.password, 10)
    }
}
