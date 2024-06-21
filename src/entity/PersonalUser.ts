import { ChildEntity, Column } from "typeorm";
import { User } from "./User";

@ChildEntity()
export class PersonalUser extends User {

    @Column()
    firstname:string

    @Column()
    lastname: string
}