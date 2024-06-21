import { NextFunction, Request, Response } from "express";
import { BookRepository } from "../repository/BookRepository";
import { Book } from "../entity/Book";
import { UserRepository } from "../repository/UserRepository";
import { LibraryRepository } from "../repository/LibraryRepository";
import { CategoryRepository } from "../repository/CategoryRepository";
import { ErrorResult } from "../utility/result/ErrorResult";
import { SuccessDataResult } from "../utility/result/SuccessDataResult";
import { SuccessResult } from "../utility/result/SuccessResult";

export class BookService {

    private bookController = new BookRepository()
    private userController = new UserRepository()
    private libraryController = new LibraryRepository()
    private categoryController = new CategoryRepository()

    async findAll(req: Request, res: Response, next: NextFunction){
        const books = await this.bookController.find()
        return new SuccessDataResult<Array<Book>>(books)
    }

    async findById(req: Request, res: Response, next: NextFunction){

        const bookId = req.params.id
        const query = req.query

        const book = await this.bookController.findById(bookId,query)

        return book ? new SuccessDataResult<Book>(book)  : new ErrorResult('book does not exist')
    }    

    async addBook(req: Request, res: Response, next: NextFunction){
        const book: Book = req.body
        const errors = []

        //find library by id and assign book.library
        const libraryId = book.library.id
        const library = await this.libraryController.findById(libraryId)
        if(!library) return new ErrorResult("library does not exist. please add library info")

        //find categories and assign book.categories 
        const categories = []

        const promises = book.categories.map(async val=>{
            return this.categoryController.findById(val.id).then((category)=>{
                category ? categories.push(category) : errors.push(`category with id: ${val.id} does not exist`)
            }).catch(err=>errors.push(`error occured on getting category with value: ${val}\n${err}`))
        })
        const result = await Promise.all(promises);

        book.categories = categories

        return !errors.length ? 
            new SuccessDataResult<Book>(await this.bookController.add(book))   
            : new ErrorResult(errors.toString())
    }

    async update(req: Request, res: Response, next: NextFunction){

        const errors=[]
        
        const newBook = await this.bookController.preload(req.body)

        if(!newBook) return new ErrorResult("book does not exist")

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

        await this.bookController.update(newBook)

        !errors.length ? new SuccessDataResult(await this.bookController.findById(newBook.id)) : new ErrorResult(errors.toString())
    }

    async delete(req: Request, res: Response, next: NextFunction){
        const bookId = req.params.id

        const bookToRemove: Book = await this.bookController.findById(bookId)

        if(!bookToRemove) return new ErrorResult(`book does not exist`)
        const deletedBook = await this.bookController.remove(bookToRemove)
        return new SuccessResult(`${deletedBook.name} deleted`)
    }
}