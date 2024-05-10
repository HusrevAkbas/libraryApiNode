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
        return user.id ? user : "cannot find the user with id: " + id
    }

    async update(req: Request, res:Response, next: NextFunction){
        const id = Number(req.params.id);
        const user = await this.userController.one(id)
        return user.id ? this.userController.update(id,req.body) : "User does not exist id: "+id        
    }

    async add(req: Request, res:Response, next: NextFunction){
        const user = req.body
        return this.userController.add(user).catch(err=>console.log(err))
    }

    async delete(req: Request, res:Response, next: NextFunction){
        const id = parseInt(req.params.id)
        const userToRemove = await this.userController.one(id)
        return userToRemove.id ? await this.userController.remove(userToRemove) : "user does not exist id: "+id
    }
}