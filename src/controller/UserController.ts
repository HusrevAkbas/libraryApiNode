import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

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
    add(user: User) {
        return this.userRepository.save(user)
    }

    update(id: number, user: User) {
        return this.userRepository.update(id, user)
    }

    remove(user: User) {
        return this.userRepository.remove(user)
    }

}