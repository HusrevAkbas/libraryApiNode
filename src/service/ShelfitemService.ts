import { NextFunction, Request, Response } from "express";
import { ErrorResult } from "../utility/result/ErrorResult";
import { SuccessDataResult } from "../utility/result/SuccessDataResult";
import { SuccessResult } from "../utility/result/SuccessResult";
import { Shelfitem } from "../entity/Shelfitem";
import { ShelfitemRepository } from "../repository/ShelfitemRepository";

export class ShelfitemService {

    private shelfitemRepository = new ShelfitemRepository()

    async findAll(req: Request, res: Response, next: NextFunction){
        const items = await this.shelfitemRepository.find()
        return new SuccessDataResult<Array<Shelfitem>>(items)
    }

    async findById(req: Request, res: Response, next: NextFunction){

        const bookId = req.params.id
        const query = req.query

        const book = await this.shelfitemRepository.findById(bookId,query)

        return book ? new SuccessDataResult<Shelfitem>(book)  : new ErrorResult('item does not exist')
    }

    async delete(req: Request, res: Response, next: NextFunction){
        const itemId = req.params.id

        const toRemove: Shelfitem = await this.shelfitemRepository.findById(itemId)

        if(!toRemove) return new ErrorResult(`book does not exist`)
        const deletedBook = await this.shelfitemRepository.remove(toRemove)
        return new SuccessResult(`${deletedBook.name} deleted`)
    }
}