import { NextFunction, Request, Response } from "express";
import { UserController } from "../controller/UserController";

export class UserService {
    private userController = new UserController();

    async findAll(req: Request, res:Response, next: NextFunction){
        return await this.userController.all(req,res,next)
            .catch(err=>console.log("Error getting users"))
    }
    async findById(req: Request, res:Response, next: NextFunction){
        return this.userController.one(req, res, next)
            .catch(err=>"Cannot find the user with id:" + err)
    }
}