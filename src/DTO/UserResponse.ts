import { Activity } from "../entity/Activity"
import { Library } from "../entity/Library"
import { Shelfitem } from "../entity/Shelfitem"
import { User } from "../entity/User"
import { Adress } from "../entity/Adress"

export class UserResponse {
    id: string
    username:string
    email: string
    imgUrl: string
    role: string
    libraries?: Array<Library>
    adress?: Adress
    shelfitems?: Array<Shelfitem>
    createdActivities?: Array<Activity>
    participatedActivities?: Array<Activity>
    type: string

    constructor(user?:User){
        this.username = user.username
        this.email = user.email
        this.id = user.id
        this.imgUrl = user.imgUrl
        this.role = user.role
        this.libraries = user.libraries
        this.adress = user.adress
        this.createdActivities = user.createdActivities
        this.participatedActivities = user.participatedActivities
        this.type = user.type
    }
}