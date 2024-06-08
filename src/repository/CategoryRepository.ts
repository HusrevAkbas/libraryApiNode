import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";

export class CategoryRepository{

    private categoryRepository = AppDataSource.getRepository(Category)
    
    all() {
        return this.categoryRepository.find()
    }

    one(id: number, relations?) {
        return this.categoryRepository.findOne({
            where: {id},
            relations: relations
        })
    }

    add(category: Category) {
        return this.categoryRepository.save(category)
    }

    update(id:number, category:Category) {
        return this.categoryRepository.update(id,category)
    }

    remove(category:Category) {
        return this.categoryRepository.remove(category)
    }

    merge(category :Category,category2 :Category){
        return this.categoryRepository.merge(category, category2)
    }

    preload(category: Category){
        return this.categoryRepository.preload(category)
    }

}