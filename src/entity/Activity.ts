import { EntityBasics } from "./Entity";
import { User } from "./User";
import { Column, ManyToMany, JoinTable, ManyToOne, Entity } from "typeorm";

@Entity()
export class Activity extends EntityBasics {

    @ManyToOne(()=>User, (user)=>user.createdActivities, {nullable:true})
    senderUser:User

    @Column()
    title: string

    @Column()
    date: Date

    @Column()
    text: string

    @ManyToMany(()=>User, (user)=>user.participatedActivities,{nullable:true, eager: true})
    @JoinTable()
    participants: User[]

}