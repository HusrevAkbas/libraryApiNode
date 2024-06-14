import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { Category } from "../entity/Category";

export class BookRepository {
    constructor(){}

    private bookRepository = AppDataSource.getRepository(Book)

    find() {
        return this.bookRepository.find({relations:{categories:true}});
    }

    findById(id:string, relations?: any) {
        return this.bookRepository.findOne({
            where: {id},
            relations: relations
        })    
    }

    findByUserId(userId:string, relations?:any){
        return this.bookRepository.findOne({
            where: {user: {id: userId}},
            relations: relations
        })
    }

    add(book:Book){
        return this.bookRepository.save(book)
    }

    update(book:Book){
        return this.bookRepository.save(book)
    }

    remove(book:Book){
        return this.bookRepository.remove(book)
    }

    merge(bookToChange :Book, book :Book){
        return this.bookRepository.merge(bookToChange,book)
    }

    preload(book: Book){
        return this.bookRepository.preload(book)
    }
}