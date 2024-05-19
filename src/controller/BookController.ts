import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { Category } from "../entity/Category";

export class BookController {
    constructor(){}

    private bookRepository = AppDataSource.getRepository(Book)

    find() {
        return this.bookRepository.find({relations:{categories:true}});
    }

    one(id:number) {
        return this.bookRepository.findOne({
            where: {id}
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
}