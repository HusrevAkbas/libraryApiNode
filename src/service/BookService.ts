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
        this.bookController.find().then(data=>{
            res.send(data)
        }).catch(err=>res.send(`error on getting book list: \n${err}`))
    }

    async findById(req: Request, res: Response, next: NextFunction){

        const bookId = parseInt(req.params.id)

        this.bookController.one(bookId).then(data=>{

            data ? res.send(data) : res.send(`book with id: ${bookId} does not exist`)

        }).catch(err=>res.send(`book with id: ${bookId} does not exist \n${err}`))
    }    

    async addBook(req: Request, res: Response, next: NextFunction){
        const book: Book = req.body
        const errors = []

        //find user by id and assign book.user
        const userId = book.user.id
        await this.userController.one(userId).then(user=>{
            user ? book.user = user : errors.push(`user with id: ${userId} does not exist. book have to belong to an user`)
        }).catch(err=>errors.push(`error on getting user:\n${err}`))

        //find library by id and assign book.library
        const libraryId = book.library.id
        await this.libraryController.one(libraryId).then(lib=>{
            lib ? book.library = lib : errors.push(`library with id: ${libraryId} does not exist. book have to belong to a library`)
        }).catch(err=>errors.push(`error on getting library:\n${err}`))

        //find categories and assign book.categories 
        const categories = []

        const promises = book.categories.map(async val=>{
            return this.categoryController.one(val.id).then((category)=>{
                category ? categories.push(category) : errors.push(`category with id: ${val.id} does not exist`)
            }).catch(err=>errors.push(`error occured on getting category with value: ${val}\n${err}`))
        })
        const result = await Promise.all(promises);

        book.categories = categories

        !errors.length ? 
        this.bookController.add(book).then(data=>{
            data ? res.send(data) : res.send("book could not added. Please try again")
        }).catch(err=>res.send(`error occured on adding book:\n${err}`)) 
        : res.send(errors)
    }

    async update(req: Request, res: Response, next: NextFunction){
        const errors=[]
        const bookId = parseInt(req.params.id)

        let oldBook : Book;

        await this.bookController.one(bookId).then(data=>{
            data ? oldBook = data : errors.push(`book with id: ${bookId} does not exist`)
        }).catch(err=>res.send(`error on getting book\n${err}`))
        
        //find user by id and assign book.user
        const userId = req.body.user.id
        await this.userController.one(userId).then(user=>{
            user ? oldBook.user = user : errors.push(`user with id: ${userId} does not exist. book have to belong to an user`)
        }).catch(err=>errors.push(`error on getting user:\n${err}`))

        //find library by id and assign book.library
        const libraryId = req.body.library.id
        await this.libraryController.one(libraryId).then(lib=>{
            lib ? oldBook.library = lib : errors.push(`library with id: ${libraryId} does not exist. book have to belong to a library`)
        }).catch(err=>errors.push(`error on getting library:\n${err}`))

        const categories = []

        const promises = req.body.categories.map(async val=>{
            return this.categoryController.one(val.id).then((category)=>{
                category ? categories.push(category) : errors.push(`category with id: ${val.id} does not exist`)
            }).catch(err=>errors.push(`error occured on getting category with value: ${val}\n${err}`))
        })
        const result = await Promise.all(promises);

        oldBook.categories = categories

        const updatedBook = this.bookController.merge(oldBook,req.body)

        console.log(oldBook)
        await this.bookController.update(oldBook)

        !errors.length ? this.bookController.one(bookId).then(data=>{
            data ? res.send(data) : errors.push(`updated book with ${bookId} does not exist`)
        }).catch(err=> `error occured on book update:\n${err}`) : res.send(errors)
    }

    async delete(req: Request, res: Response, next: NextFunction){
        const bookId = parseInt(req.params.id)

        let bookToRemove: Book;

        await this.bookController.one(bookId).then(data=>{
            data ? bookToRemove = data : res.send(`book with id: ${bookId} does not exist`)
        }).catch(err=>res.send(`error occured on deleting book\n${err}`))
        this.bookController.remove(bookToRemove).then(data=>{
            data ? res.send(data) : res.send(`book with id ${bookId}`)
        }).catch(err=>`error on removing book\n${err}`)
    }
}