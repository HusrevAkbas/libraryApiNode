import { User } from "../entity/User"

export class UserLoginResponse {
    username:string
    role:string
    id: string
    token: string

    constructor(user:User, token: string){
        this.username = user.username
        this.id = user.id
        this.role = user.role
        this.token = token
    }
}