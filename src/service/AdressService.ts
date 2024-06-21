import { NextFunction, Request, Response } from "express";
import { AdressRepository } from "../repository/AdressRepository";
import { ErrorResult } from "../utility/result/ErrorResult";
import { SuccessResult } from "../utility/result/SuccessResult";
import { UserRepository } from "../repository/UserRepository";
import { LibraryRepository } from "../repository/LibraryRepository";
import { SuccessDataResult } from "../utility/result/SuccessDataResult";
import { Adress } from "../entity/Adress";

export class AdressService {
    private adressRepository = new AdressRepository()
    private userRepository = new UserRepository()

    async findAll(req: Request, res: Response, next: NextFunction) {
        const adresses = await this.adressRepository.find()
        return new SuccessDataResult<Array<Adress>>(adresses)
    }

    async add(req: Request, res: Response, next: NextFunction) {
        const adress = await this.adressRepository.save(req.body)
        return new SuccessDataResult<Adress>(adress)
    }

    async findById(req: Request, res: Response, next: NextFunction) {

        const adress = await this.adressRepository.findById(req.params.id, req.query)

        return adress ? new SuccessDataResult<Adress>(adress) : new ErrorResult("adress couldn't found")
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const errors = []

        const adress = await this.adressRepository.findById(req.body.id,{user:true,library:true})

        if (!adress) return new ErrorResult('adress does not exist')

        const body = await this.adressRepository.preload(req.body)

        const newAdress = this.adressRepository.merge(adress,body)

        console.log(newAdress)

        //find user by id and assign adress.user
        const userId = newAdress.user.id
        const user = await this.userRepository.findById(userId,{libraries:true})
        if (!user) { 
            errors.push(`user with id: ${userId} does not exist. adress have to belong to an user`)
        }

        return !errors.length ? new SuccessDataResult<Adress>(await this.adressRepository.update(newAdress))  :  new ErrorResult(errors.toString())
    }

    async delete(req: Request, res: Response, next: NextFunction) {

        const adressId = req.params.id

        const adress = await this.adressRepository.findById(adressId)
        if (!adress) return new ErrorResult("adress couldn't found")

        const deletedAdress = await this.adressRepository.remove(adress)

        return deletedAdress ? new SuccessResult("adress deleted") : new ErrorResult("adress couldnot deleted")
    }
}