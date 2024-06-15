import { User } from "../entity/User"

export class UserLoginResponse {
    username:string
    role:string
    id: string

    constructor(user:User){
        this.username = user.username
        this.id = user.id
        this.role = user.role
    }
}