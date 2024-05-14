import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

export class BookController {

    private bookRepository = AppDataSource.getRepository(Book)

    async find() {
        return this.bookRepository.find();
    }

    async one(id:number) {
        const book = await this.bookRepository.findOne({
            where: {id}
        })

        return book ? book : new Book()      
    }

    async add(book:Book){
        return await this.bookRepository.save(book)
    }

    async update(id:number, book:Book){
        return await this.bookRepository.update(id,book)
    }

    async remove(book:Book){
        return await this.bookRepository.remove(book)
    }

    merge(bookToChange :Book, book :Book){
        return this.bookRepository.merge(bookToChange,book)
    }
}