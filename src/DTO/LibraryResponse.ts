import { Adress } from "../entity/Adress"
import { Shelfitem } from "../entity/Shelfitem"
import { UserResponse } from "./UserResponse"
import { Library } from "../entity/Library";

export class LibraryResponse {

    name: string
    
    visibility: string

    user?: UserResponse

    adress?: Adress

    shelfitems?: Shelfitem[]

    constructor(library :Library){
        this.name = library.name
        this.visibility = library.visibility
        this.user = new UserResponse(library.user)
        this.adress = library.adress
        this.shelfitems = library.shelfitems

    }

}
