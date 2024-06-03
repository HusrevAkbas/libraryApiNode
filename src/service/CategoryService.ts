import { NextFunction, Request, Response } from "express";
import { CategoryController } from "../controller/CategoryController"
import { Category } from "../entity/Category";

export class CategoryService {

    private categoryController = new CategoryController();

    async findAll(req: Request, res: Response, next: NextFunction) {
        this.categoryController.all()
        .then(data=>res.send(data))
        .catch(err => console.log("Error getting users"))
    }

    async findById(req: Request, res: Response, next: NextFunction) {

        const id = parseInt(req.params.id)

        this.categoryController.one(id)
        .then(data=>{
            data ? res.send(data) : res.send(`Category with id: ${id} does not exist`)
        })
        .catch(err=>{
            res.send(`Category with id: ${id} does not exist`)
        })
        // return category.id ? category : `Category with id: ${id} does not exist`
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
        const id = parseInt(req.params.id)
        let categoryToRemove:Category
        await this.categoryController.one(id)
        .then((data)=>{
            data ? categoryToRemove = data : res.send(`Category with id: ${id} does not exist`)
        })
        .catch(err=>res.send(err))
        this.categoryController.remove(categoryToRemove).then(ok=>{
            res.send(ok)
        }).catch(err=>`couldnt deleted: \n ${err}`) 
    }
}

