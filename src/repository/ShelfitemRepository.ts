import { AppDataSource } from "../data-source";
import { Shelfitem } from "../entity/Shelfitem";

export class ShelfitemRepository {
    constructor(){}

    private shelfitemRepository = AppDataSource.getRepository(Shelfitem)

    find() {
        return this.shelfitemRepository.find();
    }

    findById(id:string, relations?: any) {
        return this.shelfitemRepository.findOne({
            where: {id},
            relations: relations
        })    
    }

    remove(shelfitem:Shelfitem){
        return this.shelfitemRepository.remove(shelfitem)
    }
}