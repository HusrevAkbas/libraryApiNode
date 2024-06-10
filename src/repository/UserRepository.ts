import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

export class UserRepository {
    private userRepository = AppDataSource.getRepository(User)
    
    create(body: User) {
        return this.userRepository.create(body)
    }

    all() {
        return this.userRepository.find()
    }

    findById(id: string,relations?:any) {
        return this.userRepository.findOne({
            where: { id },
            relations: relations
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

    save(user: User) {
        return this.userRepository.save(user)
    }

    update(user: User) {
        return this.userRepository.save(user)
    }

    remove(user: User) {
        return this.userRepository.remove(user)
    }

    merge(user:User, user2:User){
        return this.userRepository.merge(user, user2)
    }
    
    preload(user: User){
        return this.userRepository.preload(user)
    }

}