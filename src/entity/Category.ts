import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name:"categories"})
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    imgUrl: string

    @Column()
    description: string

    @Column()
    status: boolean
}