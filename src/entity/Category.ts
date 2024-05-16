import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Book } from "./Book"

@Entity({name:"categories"})
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:false})
    name: string

    @Column()
    imgUrl: string

    @Column()
    description: string

    @Column({default: true})
    status: boolean

    @ManyToMany(()=>Book, (book)=>book.categories)
    books: Book[]
}