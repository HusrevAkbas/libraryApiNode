import { NextFunction, Request, Response } from "express";
import { LibraryController } from "../controller/LibraryController";
import { UserService } from "./UserService";
import { UserController } from "../controller/UserController";
import { User } from "../entity/User";

export class LibraryService {

    private libraryController = new LibraryController()
    private userController = new UserController()

    async findAll(req:Request, res:Response, next: NextFunction){
        return this.libraryController.all().catch(err=>console.log(`error getting libraries: ${err}`));
    }

    async findById(req:Request, res:Response, next: NextFunction){
        const id = Number(req.params.id)
        const library = await this.libraryController.one(id);
        return library.id ? library : `library with ${id} does not exist`
    }

    async add(req:Request, res:Response, next: NextFunction){
        const userId = Number(req.body.user.id)
        const user = await this.userController.one(userId)
        return user ? this.libraryController.add(req.body) : `library must belong to an user. user with ${userId} does not exist`
    }

    async update(req:Request, res:Response, next: NextFunction){

        //find user by userid
        const userId = Number(req.body.user.id)
        const user = await this.userController.one(userId)

        //check if library exists
        const id = Number(req.params.id)
        const isLibrary = await this.libraryController.one(id)

        //set user to library
        const updatedLibrary = req.body
        updatedLibrary.user = user
        return isLibrary.id ? await this.libraryController.update(id, updatedLibrary) : `library with ${id} does not exist`
    }
    
    async delete (req:Request, res:Response, next: NextFunction){
        const id = Number(req.params.id)
        const library = await this.libraryController.one(id)
        return library ? this.libraryController.remove(library) : `library with ${id} does not exist`
        
    }
}