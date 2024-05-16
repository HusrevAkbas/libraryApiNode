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
        const id = Number(req.params.id)
        let category;

        await this.categoryController.one(id).then(oldcategory=>{
            category = oldcategory
        }).catch(err=>res.send(`category couldnt found id: ${id}`))

        await this.categoryController.update(category.id,req.body)
        .catch(err=>{
            res.send(`category couldnt updated ${err}`)
        })

        this.categoryController.one(id).then(data =>{
            res.send(data)
        }).catch(err=>res.send(err))
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
        let categoryToRemove
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

