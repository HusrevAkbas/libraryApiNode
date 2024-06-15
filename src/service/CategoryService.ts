import { NextFunction, Request, Response } from "express";
import { CategoryRepository } from "../repository/CategoryRepository"
import { Category } from "../entity/Category";
import { ErrorResult } from "../utility/result/ErrorResult";

export class CategoryService {

    private categoryController = new CategoryRepository();

    async findAll(req: Request, res: Response, next: NextFunction) {
        return this.categoryController.all()
    }

    async findById(req: Request, res: Response, next: NextFunction) {

        const id = req.params.id
        const relations = req.query

        const category = await this.categoryController.findById(id,relations)

        return category ? category : new ErrorResult(`Category with id: ${id} does not exist`)
    }

    async update(req: Request, res: Response, next: NextFunction) {

        const categoryToChange = await this.categoryController.preload(req.body)
        if(!categoryToChange) return {success: false, message: 'category does not exist'}

        return this.categoryController.add(categoryToChange)
    }

    async add(req: Request, res: Response, next: NextFunction) {

        this.categoryController.add(req.body)
        .then(data=>{
            data ? res.send(data) : res.send("category couldnt recorded")
        })
        .catch(err => {
            res.send(`"${err.driverError.column}" is required`)
        })
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        let categoryToRemove:Category
        await this.categoryController.findById(id)
        .then((data)=>{
            data ? categoryToRemove = data : res.send(`Category with id: ${id} does not exist`)
        })
        .catch(err=>res.send(err))
        this.categoryController.remove(categoryToRemove).then(ok=>{
            res.send(ok)
        }).catch(err=>`couldnt deleted: \n ${err}`) 
    }
}

