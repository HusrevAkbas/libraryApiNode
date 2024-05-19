import { NextFunction, Request, Response } from "express";
import { LoginForm } from "../DTO/LoginForm";
import { UserController } from "../controller/UserController";
import { User } from "../entity/User";

export class AuthenticationService{
    private userController = new UserController()

    //BCRYPT AND JWT TOKEN WILL BE ADDED

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            let user = await this.userController.findByUsername(req.body.username)

            if(user){
                return "Username is already in use"
            }

            user = await this.userController.findByEmail(req.body.email)

            if(user){
                return "email is already in use"
            }

            const addedUser = await this.userController.add(req.body)
            if(!addedUser){
                return "User could not registered"
            } else {
                res.send(addedUser)
            }
        } catch(err) {res.send(err.message) }
    }

    async login (req: Request, res: Response, next: NextFunction){
        const user = await this.userController.findByUsername(req.body.username)

        if(!user) {
            return "user does not exist"
        } else if(user.password !== req.body.password){
            //compare password
            return "password does not match"
        } else {            
            return {token : "BCRYPT AND JWT TOKEN WILL BE ADDED"}
        }
    }
}