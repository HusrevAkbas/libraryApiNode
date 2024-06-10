import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export abstract class EntityBasics extends BaseEntity {
    
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({nullable: true})
    imgUrl: string

    @Column({default: true})
    status: boolean
    
    @CreateDateColumn()
    createdDate: Date
    
    @UpdateDateColumn()
    updatedDate: Date
    
    @DeleteDateColumn()
    deletedDate: Date

}