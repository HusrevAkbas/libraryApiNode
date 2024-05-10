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
            return "this user not exist"
        }
        return user
    }

    async add(user: User) {
        return this.userRepository.save(user)
    }

    async update(request: Request, response: Response, next: NextFunction){
        const id = parseInt(request.params.id)
        await this.userRepository.update(id,request.body).catch(err=>console.log(err))
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