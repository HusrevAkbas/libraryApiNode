import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all() {
        return this.userRepository.find()
    }

    async one(id:number) {
        const user = await this.userRepository.findOne({
            where: { id }
        })

        return !user ? new User() : user
    }

    async add(user: User) {
        return this.userRepository.save(user)
    }

    async update(id:number,user:User){
        await this.userRepository.update(id,user).catch(err=>console.log(err))
        return this.userRepository.findOne({
            where: {id}
        })
    }

    async remove(user: User) {
        await this.userRepository.remove(user)
    }

}