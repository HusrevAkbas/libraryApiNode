import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Book } from "./Book"
import { EntityBasics } from "./Entity"

@Entity({name:"categories"})
export class Category extends EntityBasics {
    @Column({unique: true})
    name: string

    @Column()
    description: string

    @ManyToMany(()=>Book, (book)=>book.categories)
    books: Book[]
}