import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export class CategoryController{

    private categoryRepository = AppDataSource.getRepository(Category)

    async remove(id: number) {
        const categoryToRemove = await this.categoryRepository.findOneBy({id})

        if(!categoryToRemove){
            return "this category doesnt exist"
        }
        await this.categoryRepository.remove(categoryToRemove)
        return "category has been removed"
    }
    async add(category: Category) {
        return await this. categoryRepository.save(category);
    }
    async update(id:number, category:Category) {
        throw new Error("Method not implemented.");
    }
    async one(id: number) {
        return await this.categoryRepository.findOneBy({id})
    }
    async all() {
        throw new Error("Method not implemented.");
    }

}