import { User } from "../entity/User"

export class UserLoginResponse {
    username:string
    email: string
    id: number

    constructor(user:User){
        this.username = user.username
        this.email = user.email
        this.id = user.id
    }
}