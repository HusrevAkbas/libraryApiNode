import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
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

        if (!user) {
            return new User()
        }
        return user
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

    async remove(id:number) {

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}