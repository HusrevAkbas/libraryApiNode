import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

export class UserController {
    private userRepository = AppDataSource.getRepository(User)
    
    create(body: User) {
        return this.userRepository.create(body)
    }


    all() {
        return this.userRepository.find()
    }

    one(id: number) {
        return this.userRepository.findOne({
            where: { id }
        })
    }

    findByUsername(username: string) {
        return this.userRepository.findOne({
            where: { username }
        })
    }

    findByEmail(email:string){
        return this.userRepository.findOneBy({email})
    }
    add(user: User) {
        return this.userRepository.save(user)
    }

    update(user: User) {
        return this.userRepository.save(user)
    }

    remove(user: User) {
        return this.userRepository.remove(user)
    }

    merge(userToUpdate:User, newUser:User){
        return this.userRepository.merge(userToUpdate, newUser)
    }
    
    preload(newUser: User){
        return this.userRepository.preload(newUser)
    }

}