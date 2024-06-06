import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/UserRepository";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { User } from "../entity/User";
import { ErrorResult } from "../utility/result/ErrorResult";
import { Library } from "../entity/Library";
import { LibraryRepository } from "../repository/LibraryRepository";
import { Adress } from "../entity/Adress";
import { AdressRepository } from "../repository/AdressRepository";

export class UserService {
    private userRepository = new UserRepository()
    private libraryRepository = new LibraryRepository()
    private adressRepository = new AdressRepository()

    async findAll(req: Request, res:Response, next: NextFunction){
        return this.userRepository.all()
            .catch(err=>{return ("Error getting users")})
    }

    async findById(req: Request, res:Response, next: NextFunction){        
        const id = parseInt(req.params.id)        
        if(isNaN(id)) return "id parameter must be a number"
        const user = await this.userRepository.one(id)
        return user ? user : `user with id: ${id} does not exist`
    }

    async findByUsername(req: Request, res:Response, next: NextFunction){        
        const username = req.query.username.toString()
        const user = await this.userRepository.findByUsername(username)
        return user ? user : `user with username: ${username} does not exist`
    }

    async update(req: Request, res:Response, next: NextFunction){
        const user = await this.userRepository.one(req.body.id,{libraries:true})
        console.log(user)
        if(req.body.adress) {
            const adress = await this.adressRepository.add(req.body.adress)
            req.body.adress = adress
        }
        const newUser = await this.userRepository.preload(req.body)

        const lastuser = this.userRepository.merge(user,newUser)
        return lastuser ? this.userRepository.update(lastuser) : `user does not exist`    
    }

    //use register() instead
    // async add(req: Request, res:Response, next: NextFunction){
    //     const user = req.body
    //     return this.userController.add(user).catch(err=>console.log(err))
    // }

    async delete(req: Request, res:Response, next: NextFunction){
        const id = parseInt(req.params.id)
        if(isNaN(id)) return "id parameter must be a number"
        const userToRemove = await this.userRepository.one(id)
        return userToRemove ? await this.userRepository.remove(userToRemove) : `user with id: ${id} does not exist`
    }

    async isUsernameExist(req: Request, res:Response, next: NextFunction){        
        const username = req.query.username.toString()
        const user = await this.userRepository.findByUsername(username)
        return user ? true : false
    }

    async isEmailExist(req: Request, res:Response, next: NextFunction){        
        const email = req.query.email.toString()
        const user = await this.userRepository.findByEmail(email)
        return user ? true : false
    }

    async register(req: Request, res: Response, next: NextFunction) {
            let user = await this.userRepository.findByUsername(req.body.username)

            if(user){
                return new ErrorResult("Username is already in use")
            }

            user = await this.userRepository.findByEmail(req.body.email)

            if(user){
                return new ErrorResult("email is already in use")
            }

            const userToAdd: User = this.userRepository.create(req.body)

            const addedUser = await this.userRepository.save(userToAdd)

            console.log(addedUser)

            if(!addedUser){
                return "User could not registered"
            } else {

                const library = new Library()
                library.name = `${userToAdd.username}'s Library`
                library.user = addedUser

                await this.libraryRepository.save(library)

                return addedUser
            }
    }

    async login (req: Request, res: Response, next: NextFunction){

        const {username, password} = req.body
        const user = await this.userRepository.findByUsername(username)
        if(!user) {
            return new ErrorResult("username or password is wrong. please check your credentials")
        } 

        //compare password
        const doesPasswordMatch = await bcrypt.compare(password, user.password)

        if(!doesPasswordMatch){
            return new ErrorResult("username or password is wrong. please check your credentials")            
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