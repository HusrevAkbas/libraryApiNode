import { NextFunction, Request, Response } from "express";
import { LibraryRepository } from "../repository/LibraryRepository";
import { UserRepository } from "../repository/UserRepository";
import { ErrorResult } from "../utility/result/ErrorResult";
import { Library } from "../entity/Library";
import { LibraryResponse } from "../DTO/LibraryResponse";
import { SuccessDataResult } from "../utility/result/SuccessDataResult";

export class LibraryService {

    private libraryController = new LibraryRepository()
    private userController = new UserRepository()

    async findAll(req:Request, res:Response, next: NextFunction){
        const libraries = await this.libraryController.all()
        return new SuccessDataResult<Array<Library>>(libraries)
    }

    async findById(req:Request, res:Response, next: NextFunction){

        const id = req.params.id
        const relations = req.query

        const library :Library = await this.libraryController.findById(id,relations)

        return library ? new LibraryResponse(library)  : new ErrorResult('library does not exist')
    }

    async findByUserId(req:Request, res:Response, next: NextFunction){
        const id = req.params.id
        const library = await this.libraryController.findByUserId(id)
        return library.length > 0 ? new SuccessDataResult<Array<Library>>(library)  : new ErrorResult('library does not exist')
    }

    async add(req:Request, res:Response, next: NextFunction){
        const {body} = req
        const errors = []
        //check if request has all required fields
        if(!Object.keys(body).includes('user')) errors.push(`library must belong to a user`)
        if(!Object.keys(body).includes('name')) errors.push(`library must have a name`)
        if(errors.length>0) return new ErrorResult(errors.toString()) 

        //check if user exists
        const userId = body.user.id
        const user = await this.userController.findById(userId)
        return user ? new SuccessDataResult<Library>(await this.libraryController.save(body)) 
            : new ErrorResult(`library must belong to a user. user does not exist`)
    }

    async update(req:Request, res:Response, next: NextFunction){

        //check if library exists
        const body = await this.libraryController.findById(req.body.id)
        if(!body) return new ErrorResult('library does not exist')
            
        const library = await this.libraryController.preload(req.body)
        console.log(body)

        if(!library) return new ErrorResult("library does not exist")

        //find user by userid if user is sent
        if(Object.keys(req.body).includes('user')) {

            const userId = req.body.user.id

            const user = await this.userController.findById(userId)

            if(!user){ 
                return new ErrorResult("user does not exist")
            } else {
                library.user = user
            }
        }

        const updatedLibrary = await this.libraryController.save(library)
        return updatedLibrary ? new SuccessDataResult<Library>(updatedLibrary) : new ErrorResult("library could not updated")
    }
    
    async delete (req:Request, res:Response, next: NextFunction){
        const id = req.params.id
        const library = await this.libraryController.findById(id)
        return library ? new SuccessDataResult<Library>(await this.libraryController.remove(library))  : new ErrorResult(`library does not exist`)
    }
}