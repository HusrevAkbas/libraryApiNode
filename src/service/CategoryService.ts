import { NextFunction, Request, Response } from "express";
import { CategoryController } from "../controller/CategoryController"

export class CategoryService {

    private categoryController = new CategoryController();

    async findAll(req: Request, res: Response, next: NextFunction) {
        return this.categoryController.all()
            .catch(err => console.log("Error getting users"))
    }

    async findById(req: Request, res: Response, next: NextFunction) {

        const id = parseInt(req.params.id)
        const category = await this.categoryController.one(id)
        return category.id ? category : `Category with id: ${id} does not exist`
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id)
        const category = await this.categoryController.one(id)
        return category.id ? this.categoryController.update(id,req.body) : `Category with id: ${id} does not exist`
    }

    async add(req: Request, res: Response, next: NextFunction) {
        const category = req.body
        return await this.categoryController.add(category).catch(err => console.log(err))
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id)
        const categoryToRemove = await this.categoryController.one(id)
        return categoryToRemove ? await this.categoryController.remove(categoryToRemove) : `Category with id: ${id} does not exist`
    }
}

