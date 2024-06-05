import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { EntityBasics } from "./Entity";
import { Library } from "./Library";
import { User } from "./User";

@Entity()
export class Adress extends EntityBasics {

    @ManyToOne(()=>User, (user)=>user.adresses , {eager:true})
    @JoinColumn()
    user :User

    @OneToOne(()=>Library, (library)=> library.adress , {nullable:true, eager:true})
    @JoinColumn()
    library :Library

    @Column({default: 'My adress name'})
    name :string // for example: home, office, fathers' etc.

    @Column()
    country :string

    @Column()
    city :string

    @Column()
    zipcode :number

    @Column()
    adressLine1 :string

    @Column({nullable:true})
    adressLine2 :string
}