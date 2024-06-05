import { NextFunction, Request, Response } from "express";
import { LibraryRepository } from "../repository/LibraryRepository";
import { UserRepository } from "../repository/UserRepository";

export class LibraryService {

    private libraryController = new LibraryRepository()
    private userController = new UserRepository()

    async findAll(req:Request, res:Response, next: NextFunction){
        this.libraryController.all().then(data=>{
            res.send(data)
        })
        .catch(err=>console.log(`error getting libraries: ${err}`));
    }

    async findById(req:Request, res:Response, next: NextFunction){
        const id = Number(req.params.id)
        this.libraryController.one(id).then(data => {
            data ? res.send(data) : res.send(`library with ${id} does not exist`)
        }).catch(err=>res.send(err))
    }

    async findByUserId(req:Request, res:Response, next: NextFunction){
        const id = parseInt(req.params.id)
        const library = await this.libraryController.findByUserId(id)
        return library.length > 0 ?  library : {success: false, message: 'could not found library'}
    }

    async add(req:Request, res:Response, next: NextFunction){
        const {body} = req
        const errors = []
        //check if request has all required fields
        if(!Object.keys(body).includes('user')) errors.push(`library must belong to a user`)
        if(!Object.keys(body).includes('name')) errors.push(`library must have a name`)
        if(errors.length>0) return errors

        //check if user exists
        const userId = Number(body.user.id)
        this.userController.one(userId).then(data=>{
            data ? this.libraryController.save(body).then(added=>res.send(added)) 
            : res.send(`library must belong to a user. user with ${userId} does not exist`)
        }).catch(err=>res.send(err))
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