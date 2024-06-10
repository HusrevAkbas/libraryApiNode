import { User } from "../entity/User"

export class UserLoginResponse {
    username:string
    id: string

    constructor(user:User){
        this.username = user.username
        this.id = user.id
    }
}