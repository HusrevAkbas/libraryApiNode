import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export class CategoryController{

    private categoryRepository = AppDataSource.getRepository(Category)
    
    async all() {
        return await this.categoryRepository.find()
    }

    async one(id: number) {
        const category = await this.categoryRepository.findOneBy({id})
        return !category ? new Category() : category
    }

    async add(category: Category) {
        return await this. categoryRepository.save(category)
    }

    async update(id:number, category:Category) {
        await this.categoryRepository.update(id,category)
        return await this.categoryRepository.findOne({
            where: {id}
        })
    }

    async remove(id: number) {
        const categoryToRemove = await this.categoryRepository.findOneBy({id})

        if(!categoryToRemove){
            return "this category doesnt exist"
        }
        await this.categoryRepository.remove(categoryToRemove)
        return "category has been removed"
    }

}