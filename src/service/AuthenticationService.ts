import { NextFunction, Request, Response } from "express";
import { UserController } from "../controller/UserController";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

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

            const userToAdd: User = this.userController.create(req.body)

            const addedUser = await this.userController.add(userToAdd)
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
        } 
        const doesPasswordMatch = await bcrypt.compare(req.body.password, user.password)

        if(!doesPasswordMatch){
            //compare password
            return "password does not match"
        }

        const accessToken = jwt.sign({
            username: user.username,
            email: user.email
        }, process.env.SECRET_KEY,{expiresIn:"10h"})

        return {token : accessToken}
    }
}