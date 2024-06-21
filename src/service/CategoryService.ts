import { NextFunction, Request, Response } from "express";
import { CategoryRepository } from "../repository/CategoryRepository"
import { Category } from "../entity/Category";
import { ErrorResult } from "../utility/result/ErrorResult";
import { SuccessDataResult } from "../utility/result/SuccessDataResult";
import { SuccessResult } from "../utility/result/SuccessResult";

export class CategoryService {

    private categoryController = new CategoryRepository();

    async findAll(req: Request, res: Response, next: NextFunction) {
        const categories = await this.categoryController.all()
        return new SuccessDataResult<Array<Category>>(categories)
    }

    async findById(req: Request, res: Response, next: NextFunction) {

        const id = req.params.id
        const relations = req.query

        const category = await this.categoryController.findById(id,relations)

        return category ? new SuccessDataResult<Category>(category)  : new ErrorResult(`Category does not exist`)
    }

    async update(req: Request, res: Response, next: NextFunction) {

        const categoryToChange = await this.categoryController.preload(req.body)
        if(!categoryToChange) return {success: false, message: 'category does not exist'}


        const updatedCategory = await this.categoryController.add(categoryToChange)
        return new SuccessDataResult<Category>(updatedCategory)
    }

    async add(req: Request, res: Response, next: NextFunction) {

        const category = await this.categoryController.add(req.body)

        return category ? new SuccessDataResult(category) : new ErrorResult("category could not add")
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        let categoryToRemove :Category = await this.categoryController.findById(id)

        categoryToRemove ? categoryToRemove = await this.categoryController.remove(categoryToRemove) : new ErrorResult(`category does not exist`)

        return categoryToRemove ? new SuccessResult("category deleted") : new ErrorResult("category could no deleted")
    }
}

