import { NextFunction, Request, Response } from "express";
import { UserController } from "../controller/UserController";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { User } from "../entity/User";

export class UserService {
    private userController = new UserController();

    async findAll(req: Request, res:Response, next: NextFunction){
        return this.userController.all()
            .catch(err=>{return ("Error getting users")})
    }

    async findById(req: Request, res:Response, next: NextFunction){        
        const id = parseInt(req.params.id)        
        if(isNaN(id)) return "id parameter must be a number"
        const user = await this.userController.one(id)
        return user ? user : `user with id: ${id} does not exist`
    }

    async findByUsername(req: Request, res:Response, next: NextFunction){        
        const username = req.query.username.toString()
        const user = await this.userController.findByUsername(username)
        return user ? user : `user with username: ${username} does not exist`
    }

    async update(req: Request, res:Response, next: NextFunction){
        const id = Number(req.params.id);
        const user = await this.userController.one(id)
        const newUser = await this.userController.preload(req.body)
        return newUser ? this.userController.update(newUser) : `user with id: ${id} does not exist`        
    }

    //use register() instead
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

    async isEmailExist(req: Request, res:Response, next: NextFunction){        
        const email = req.query.email.toString()
        const user = await this.userController.findByEmail(email)
        return user ? true : false
    }

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

        const {username, password} = req.body
        const user = await this.userController.findByUsername(username)

        if(!user) {
            return {success: false,message: "username or password is wrong. please check your credentials"}
        } 

        //compare password
        const doesPasswordMatch = await bcrypt.compare(password, user.password)

        if(!doesPasswordMatch){
            return {success: false,message: "username or password is wrong. please check your credentials"}
            
        }

        const accessToken = jwt.sign({
            username: user.username,
            email: user.email
        }, process.env.SECRET_KEY,{expiresIn:"10d"})

        //User DTO will be configured
        delete user.password

        return {user: user, token : accessToken, success: true}
        
    }
}