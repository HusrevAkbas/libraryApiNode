import { AppDataSource } from "../data-source"
import { PersonalUser } from "../entity/PersonalUser"
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

        return !user ? new PersonalUser() || new User() : user
    }

    async add(user: PersonalUser|User) {
        return this.userRepository.save(user)
    }

    async update(id:number,user:PersonalUser|User){
        await this.userRepository.update(id,user).catch(err=>console.log(err))
        return this.userRepository.findOne({
            where: {id}
        })
    }

    async remove(user: PersonalUser|User) {
        await this.userRepository.remove(user)
    }

}