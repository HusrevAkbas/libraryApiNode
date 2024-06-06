import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { EntityBasics } from "./Entity";
import { Library } from "./Library";
import { User } from "./User";

@Entity()
export class Adress extends EntityBasics {

    @ManyToOne(()=>User, (user)=>user.adresses)
    @JoinColumn()
    user :User

    @OneToOne(()=>Library, (library)=> library.adress)
    @JoinColumn()
    library :Library

    @Column({default: 'Default adress'})
    name :string // for example: home, office, fathers' etc.

    @Column()
    country :string

    @Column({nullable:true})
    state :string

    @Column()
    city :string

    @Column()
    zipcode :number

    @Column({nullable:true})
    adressLine :string
}