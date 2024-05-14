import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, OneToMany, JoinColumn } from "typeorm"
import { Library } from "./Library"
import { Shelfitem } from "./Shelfitem"

@Entity({name:"users"})
@TableInheritance({ column: { type: "varchar", name: "type", default: "PersonalUser" } })
export class User {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false, unique: true})
    email: string

    @Column()
    password: string

    @Column({nullable: false, unique: true})
    username: string

    @Column()
    profileImgUrl: string

    @Column({default: true})
    status: boolean

    @Column()
    role: string

    @OneToMany(()=>Library, (library)=>library.user)
    library: Library[]

    // @OneToMany(()=>Shelfitem, (shelfitem)=>shelfitem.user)
    // shelfitem: Shelfitem[]
}
