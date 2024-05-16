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

    async findByUsername(username: string) {
        const user = await this.userRepository.findOne({
            where: { username }
        })

        return !user ? new User() : user
    }
    async add(user: User) {
        return await this.userRepository.save(user).catch(err => { 
            return console.log(err)
        })
    }

    async update(id: number, user: User) {
        await this.userRepository.update(id, user).catch(err => console.log(err))
        return this.userRepository.findOne({
            where: { id }
        })
    }

    async remove(user: User) {
        return await this.userRepository.remove(user)
    }

}