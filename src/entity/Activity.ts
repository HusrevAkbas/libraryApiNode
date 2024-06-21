import { EntityBasics } from "./Entity";
import { User } from "./User";
import { Column, ManyToMany, JoinTable, ManyToOne, Entity, JoinColumn } from "typeorm";

@Entity()
export class Activity extends EntityBasics {

    @ManyToOne(()=>User, (user)=>user.createdActivities, {nullable:true})
    @JoinColumn()
    user:User

    @Column()
    title: string

    @Column()
    date: Date

    @Column({nullable:true})
    expireDate: Date

    @Column({nullable:true})
    text: string

    @ManyToMany(()=>User, (user)=>user.participatedActivities,{nullable:true})
    @JoinTable()
    participants: User[]

}