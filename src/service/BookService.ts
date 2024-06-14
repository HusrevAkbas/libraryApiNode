import { NextFunction, Request, Response } from "express";
import { BookRepository } from "../repository/BookRepository";
import { Book } from "../entity/Book";
import { UserRepository } from "../repository/UserRepository";
import { LibraryRepository } from "../repository/LibraryRepository";
import { CategoryRepository } from "../repository/CategoryRepository";
import { ErrorResult } from "../utility/result/ErrorResult";

export class BookService {

    private bookController = new BookRepository()
    private userController = new UserRepository()
    private libraryController = new LibraryRepository()
    private categoryController = new CategoryRepository()

    async findAll(req: Request, res: Response, next: NextFunction){
        this.bookController.find().then(data=>{
            res.send(data)
        }).catch(err=>res.send(`error on getting book list: \n${err}`))
    }

    async findById(req: Request, res: Response, next: NextFunction){

        const bookId = req.params.id
        const query = req.query

        const book = await this.bookController.findById(bookId,query)

        return book ? book : new ErrorResult('book does not exist')
    }    

    async addBook(req: Request, res: Response, next: NextFunction){
        const book: Book = req.body
        const errors = []

        //find user by id and assign book.user
        const userId = book.user.id
        await this.userController.findById(userId).then(user=>{
            user ? book.user = user : errors.push(`user with id: ${userId} does not exist. book have to belong to an user`)
        }).catch(err=>errors.push(`error on getting user:\n${err}`))

        //find library by id and assign book.library
        const libraryId = book.library.id
        await this.libraryController.findById(libraryId).then(lib=>{
            lib ? book.library = lib : errors.push(`library with id: ${libraryId} does not exist. book have to belong to a library`)
        }).catch(err=>errors.push(`error on getting library:\n${err}`))

        //find categories and assign book.categories 
        const categories = []

        const promises = book.categories.map(async val=>{
            return this.categoryController.findById(val.id).then((category)=>{
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
        
        const newBook = await this.bookController.preload(req.body)

        if(!newBook) return {success: false, message: 'book does not exist'}
        
        //find user by id and assign book.user
        const userId = req.body.user.id
        await this.userController.findById(userId).then(user=>{
            user ? newBook.user = user : errors.push(`user with id: ${userId} does not exist. book have to belong to an user`)
        }).catch(err=>errors.push(`error on getting user:\n${err}`))

        //find library by id and assign book.library
        const libraryId = req.body.library.id
        await this.libraryController.findById(libraryId).then(lib=>{
            lib ? newBook.library = lib : errors.push(`library with id: ${libraryId} does not exist. book have to belong to a library`)
        }).catch(err=>errors.push(`error on getting library:\n${err}`))

        const categories = []

        const promises = req.body.categories.map(async val=>{
            return this.categoryController.findById(val.id).then((category)=>{
                category ? categories.push(category) : errors.push(`category with id: ${val.id} does not exist`)
            }).catch(err=>errors.push(`error occured on getting category with value: ${val}\n${err}`))
        })
        
        const result = await Promise.all(promises);

        newBook.categories = categories

        console.log(newBook)
        await this.bookController.update(newBook)

        !errors.length ? this.bookController.findById(newBook.id).then(data=>{
            data ? res.send(data) : errors.push(`updated book with ${newBook.id} does not exist`)
        }).catch(err=> `error occured on book update:\n${err}`) : res.send(errors)
    }

    async delete(req: Request, res: Response, next: NextFunction){
        const bookId = req.params.id

        let bookToRemove: Book;

        await this.bookController.findById(bookId).then(data=>{
            data ? bookToRemove = data : res.send(`book with id: ${bookId} does not exist`)
        }).catch(err=>res.send(`error occured on deleting book\n${err}`))
        this.bookController.remove(bookToRemove).then(data=>{
            data ? res.send(data) : res.send(`book with id ${bookId}`)
        }).catch(err=>`error on removing book\n${err}`)
    }
}