import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

export class BookRepository {
    constructor(){}

    private bookRepository = AppDataSource.getRepository(Book)

    find() {
        return this.bookRepository.find();
    }

    findById(id:string, relations?: any) {
        return this.bookRepository.findOne({
            where: {id},
            relations: relations
        })    
    }

    findBy(where: any, relations?: any) {
        return this.bookRepository.find({
            where: where,
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