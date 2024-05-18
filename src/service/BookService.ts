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

        const bookId = parseInt(req.params.id)

        this.bookController.one(bookId).then(data=>{

            data ? res.send(data) : res.send(`book with id: ${bookId} does not exist`)

        }).catch(err=>res.send(`book with id: ${bookId} does not exist \n ${err}`))
    }    

    async addBook(req: Request, res: Response, next: NextFunction){
        const book: Book = req.body
        const errors = []

        //find user by id and assign book.user
        const userId = book.user.id
        await this.userController.one(userId).then(user=>{
            user ? book.user = user : errors.push(`user with id: ${userId} does not exist. book have to belong to an user`)
        })

        //find library by id and assign book.library
        const libraryId = book.library.id
        await this.libraryController.one(libraryId).then(lib=>{
            lib ? book.library = lib : errors.push(`library with id: ${libraryId} does not exist. book have to belong to a library`)
        })

        //find categories and assign book.categories 
        const categories = []

        const promises = book.categories.map(async val=>{
            return this.categoryController.one(val.id).then((category)=>{
                category ? categories.push(category) : errors.push(`category with id: ${val.id} does not exist`)
            }).catch(err=>errors.push("error occured on getting categories"))
        })
        const result = await Promise.all(promises);

        book.categories = categories

        !errors.length ? 
        this.bookController.add(book).then(data=>{
            data ? res.send(data) : res.send("book could not added. Please try again")
        }).catch(err=>res.send(err)) 
        : res.send(errors)
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