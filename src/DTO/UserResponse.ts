import { Library } from "../entity/Library"
import { Shelfitem } from "../entity/Shelfitem"
import { User } from "../entity/User"

export class UserResponse {
    id: string
    username:string
    email: string
    imgUrl: string
    role: string
    libraries: Array<Library>
    shelfitems: Array<Shelfitem>

    constructor(user:User){
        this.username = user.username
        this.email = user.email
        this.id = user.id
        this.imgUrl = user.imgUrl
        this.role = user.role
        this.libraries = user.libraries
        this.shelfitems = user.shelfitems
    }
}