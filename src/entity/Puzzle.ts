import { Column, ChildEntity, ManyToMany, JoinTable } from "typeorm"
import { Shelfitem } from "./Shelfitem"
import { Category } from "./Category"

@ChildEntity()
export class Puzzle extends Shelfitem {
    @Column()
    name: string

    @Column()
    pieces: number

    @Column({nullable: true})
    ageGroup: number

    @Column({nullable:true})
    info: string

    @Column()
    type: "Puzzle"
}