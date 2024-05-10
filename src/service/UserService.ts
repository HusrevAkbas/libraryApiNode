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
        return this.userController.one(id)
            .catch(err=>"Cannot find the user with id:" + err)
    }
    async update(req: Request, res:Response, next: NextFunction){
        return this.userController.update(req,res,next)
    }

    async add(req: Request, res:Response, next: NextFunction){
        const user = req.body
        return this.userController.add(user).catch(err=>console.log(err))
    }

    async delete(req: Request, res:Response, next: NextFunction){
        const id = parseInt(req.params.id)
        return this.userController.remove(id)
    }
}