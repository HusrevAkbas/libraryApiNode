import { NextFunction, Request, Response } from "express";
import { AdressRepository } from "../repository/AdressRepository";
import { ErrorResult } from "../utility/result/ErrorResult";
import { SuccessResult } from "../utility/result/SuccessResult";
import { UserRepository } from "../repository/UserRepository";
import { LibraryRepository } from "../repository/LibraryRepository";

export class AdressService {
    private adressRepository = new AdressRepository()
    private userRepository = new UserRepository();
    private libraryRepository = new LibraryRepository()

    async findAll(req: Request, res: Response, next: NextFunction) {
        return this.adressRepository.find()
    }

    async add(req: Request, res: Response, next: NextFunction) {
        return await this.adressRepository.add(req.body)
    }

    async findById(req: Request, res: Response, next: NextFunction) {

        const adressId = parseInt(req.params.id)
        if (isNaN(adressId)) return new ErrorResult("id parameter must be a number")

        const adress = await this.adressRepository.one(adressId)

        return adress ? adress : new ErrorResult("adress couldn't found")
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const errors = []

        const adress = await this.adressRepository.one(req.body.id,{user:true,library:true})

        if (!adress) return new ErrorResult('adress does not exist')

        const body = await this.adressRepository.preload(req.body)

        const newAdress = this.adressRepository.merge(adress,body)

        console.log(newAdress)

        //find user by id and assign adress.user
        const userId = newAdress.user.id
        const user = await this.userRepository.one(userId,{libraries:true})
        if (!user) { 
            errors.push(`user with id: ${userId} does not exist. adress have to belong to an user`)
        }

        return !errors.length ? await this.adressRepository.update(newAdress) :  new ErrorResult(errors.toString())
    }

    async delete(req: Request, res: Response, next: NextFunction) {

        const adressId = parseInt(req.params.id)
        if (isNaN(adressId)) return new ErrorResult("id parameter must be a number")

        const adress = await this.adressRepository.one(adressId)
        if (!adress) return new ErrorResult("adress couldn't found")

        const deletedAdress = await this.adressRepository.remove(adress)

        return deletedAdress ? new SuccessResult("adress deleted") : new ErrorResult("adress couldnot deleted")
    }
}