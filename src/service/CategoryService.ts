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
        return this.categoryController.one(id)
            .catch(err => "Cannot find the user with id:" + err)
    }
    async update(req: Request, res: Response, next: NextFunction) {
        const id = Number(req.params.id)
        const category = await this.categoryController.one(id)
        return category.id ? this.categoryController.update(id,category) : "Category does not exist id: "+id
    }

    async add(req: Request, res: Response, next: NextFunction) {
        const user = req.body
        return this.categoryController.add(user).catch(err => console.log(err))
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(req.params.id)
        return this.categoryController.remove(id)
    }
}

