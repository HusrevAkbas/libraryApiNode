import { ChildEntity, Column } from "typeorm";
import { User } from "./User";
import { Adress } from "./Adress";

@ChildEntity()
export class PersonalUser extends User {

    @Column()
    firstname:string

    @Column()
    lastname: string
    
    @Column()
    status: boolean
}