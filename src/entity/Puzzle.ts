import { Column, ChildEntity, ManyToMany, JoinTable } from "typeorm"
import { Shelfitem } from "./Shelfitem"

@ChildEntity()
export class Puzzle extends Shelfitem {

    @Column()
    pieces: number

    @Column({nullable: true})
    ageGroup: string

    @Column({nullable:true})
    info: string

    @Column({default: 'Puzzle'})
    type: "Puzzle"
}