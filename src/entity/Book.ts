import { Column, ChildEntity, ManyToMany, JoinTable } from "typeorm"
import { Shelfitem } from "./Shelfitem"
import { Category } from "./Category"

@ChildEntity()
export class Book extends Shelfitem {

    @Column()
    author: string

    @Column()
    publisher: string

    @Column()
    publishYear: number

    @Column()
    pages: number

    @ManyToMany(()=>Category,(category)=>category.books,{cascade:true})
    @JoinTable()
    categories: Category[]

    @Column()
    isbn10: string

    @Column()
    isbn13: string

    @Column()
    quantity: number
}