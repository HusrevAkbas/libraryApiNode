import { NextFunction, Request, Response } from "express";
import { BookController } from "../controller/BookController";
import { Book } from "../entity/Book";
import { UserController } from "../controller/UserController";
import { LibraryController } from "../controller/LibraryController";
import { CategoryController } from "../controller/CategoryController";

export class BookService {

    private bookController = new BookController()
    private userController = new UserController()
    private libraryController = new LibraryController()
    private categoryController = new CategoryController()

    async findAll(req: Request, res: Response, next: NextFunction){
        return this.bookController.find();
    }

    async findById(req: Request, res: Response, next: NextFunction){
        
        //HOW TO GET REQUIRED FIELDS WILL BE INJECTED AS UTILITY
        console.log(this.bookController.metadata().map(val=> val.path))
        /////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////

        const bookId = parseInt(req.params.id)
        const book = await this.bookController.one(bookId);
        return book.id ? book : `book with id: ${bookId} does not exist`
    }    

    async addBook(req: Request, res: Response, next: NextFunction){
        const book: Book = req.body

        //find user by id and assign book.user
        const userId = book.user.id
        const user = await this.userController.one(userId)
        book.user = user;

        //find library by id and assign book.library
        const libraryId = book.library.id
        const library = await this.libraryController.one(libraryId)
        book.library = library

        //find categories and assign book.categories
        const categories = []
        book.categories ? book.categories.forEach(cat => {
            this.categoryController.one(cat.id).then(res=> {
                categories.push(res)
            })
        }) : `book does not have any category`
        book.categories = categories

        return !user.id ? `user with id: ${userId} does not exist. book have to belong to an user` 
                :!library.id ? `library with id: ${libraryId} does not exist. book have to belong to a library` 
                : this.bookController.add(book).catch(err=>res.send(err))
    }

    async update(req: Request, res: Response, next: NextFunction){
        return "will be added soon"
    }

    async delete(req: Request, res: Response, next: NextFunction){
        const bookId = parseInt(req.params.id)
        const book = await this.bookController.one(bookId)
        return book.id ? this.bookController.remove(book) : `book with id: ${bookId} does not exist`
    }
}