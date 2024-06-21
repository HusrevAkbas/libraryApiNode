import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/UserRepository";
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { User } from "../entity/User";
import { ErrorResult } from "../utility/result/ErrorResult";
import { Library } from "../entity/Library";
import { LibraryRepository } from "../repository/LibraryRepository";
import { UserLoginResponse } from "../DTO/UserLoginResponse";
import { UserResponse } from "../DTO/UserResponse";
import { SuccessResult } from "../utility/result/SuccessResult";
import { AdressRepository } from "../repository/AdressRepository";
import { SuccessDataResult } from "../utility/result/SuccessDataResult";

export class UserService {
    private userRepository = new UserRepository()
    private libraryRepository = new LibraryRepository()
    private addressRepository = new AdressRepository()

    async findAll(req: Request, res:Response, next: NextFunction){
        const users = (await this.userRepository.all()).map(user=> new UserResponse(user))
        return new SuccessDataResult<Array<UserResponse>>(users)
    }

    async findById(req: Request, res:Response, next: NextFunction){       

        const id = req.params.id
        const relations = req.query

        const user = await this.userRepository.findById(id,relations)

        return user ? new SuccessDataResult(new UserResponse(user)) : new ErrorResult(`user does not exist`) 
    }

    async findByUsername(req: Request, res:Response, next: NextFunction){       
        const username = req.query.username.toString()
        const user = await this.userRepository.findByUsername(username)
        return user ? new SuccessDataResult(new UserResponse(user)) : `user with username: ${username} does not exist`
    }

    async update(req: Request, res:Response, next: NextFunction){
        console.log(req.body.adress)
        const newUser = await this.userRepository.preload(req.body)
        if(!newUser) return new ErrorResult(`user does not exist`)

        //update or add new adress to user
        if(req.body.adress !== undefined){
            this.addressRepository.save({
                ...req.body.adress,
                user:{
                    id: req.body.id
                }})
        }
        
        const updatedUser = await this.userRepository.update(newUser)
        return updatedUser ? new SuccessDataResult (new UserResponse(updatedUser)) : new ErrorResult(`user could not updated`)
    }

    async delete(req: Request, res:Response, next: NextFunction){
        const id = req.params.id
        const userToRemove = await this.userRepository.findById(id)
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

        if(!addedUser){
            return "User could not registered"
        } else {

            const library = new Library()
            library.name = `${userToAdd.username}'s Library`
            library.user = addedUser

               await this.libraryRepository.save(library)

            return new SuccessDataResult(new UserResponse(addedUser)) 
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

        return new SuccessDataResult(new UserLoginResponse(user,accessToken))
        
    }
}