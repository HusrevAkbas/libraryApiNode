import { NextFunction, Request, Response } from "express";
import { UserController } from "../controller/UserController";

export class UserService {
    private userController = new UserController();

    async findAll(req: Request, res:Response, next: NextFunction){
        return this.userController.all()
            .catch(err=>console.log("Error getting users"))
    }

    async findById(req: Request, res:Response, next: NextFunction){        
        const id = parseInt(req.params.id)
        const user = await this.userController.one(id)
        return user.id ? user : `user with id: ${id} does not exist`
    }

    async findByUsername(req: Request, res:Response, next: NextFunction){        
        const username = req.query.username.toString()
        const user = await this.userController.findByUsername(username)
        return user.id ? user : `user with username: ${username} does not exist`
    }

    async update(req: Request, res:Response, next: NextFunction){
        const id = Number(req.params.id);
        const user = await this.userController.one(id)
        return user.id ? this.userController.update(id,req.body) : `user with id: ${id} does not exist`        
    }

    //use register() in Authentication instead
    // async add(req: Request, res:Response, next: NextFunction){
    //     const user = req.body
    //     return this.userController.add(user).catch(err=>console.log(err))
    // }

    async delete(req: Request, res:Response, next: NextFunction){
        const id = parseInt(req.params.id)
        if(isNaN(id)) return "id parameter must be a number"
        const userToRemove = await this.userController.one(id)
        return userToRemove ? await this.userController.remove(userToRemove) : `user with id: ${id} does not exist`
    }

    async isUsernameExist(req: Request, res:Response, next: NextFunction){        
        const username = req.query.username.toString()
        const user = await this.userController.findByUsername(username)
        return user ? true : false
    }
}