import { NextFunction, Request, Response } from "express";
import { ErrorResult } from "../utility/result/ErrorResult";
import { SuccessResult } from "../utility/result/SuccessResult";
import { UserRepository } from "../repository/UserRepository";
import { SuccessDataResult } from "../utility/result/SuccessDataResult";
import { Puzzle } from "../entity/Puzzle";
import { PuzzleRepository } from "../repository/PuzzleRepository";

export class PuzzleService {
    private puzzleRepository = new PuzzleRepository()

    async findAll(req: Request, res: Response, next: NextFunction) {
        const puzzles = await this.puzzleRepository.find()
        return new SuccessDataResult<Array<Puzzle>>(puzzles)
    }

    async add(req: Request, res: Response, next: NextFunction) {
        const puzzle :Puzzle = await this.puzzleRepository.save(req.body)
        return new SuccessDataResult<Puzzle>(puzzle)
    }

    async findById(req: Request, res: Response, next: NextFunction) {

        const puzzle = await this.puzzleRepository.findById(req.params.id, req.query)

        return puzzle ? new SuccessDataResult<Puzzle>(puzzle) : new ErrorResult("puzzle couldn't found")
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const errors = []

        const puzzle = await this.puzzleRepository.findById(req.body.id,{library:true})

        if (!puzzle) return new ErrorResult('puzzle does not exist')

        const body = await this.puzzleRepository.preload(req.body)

        const newAdress = this.puzzleRepository.merge(puzzle,body)

        return !errors.length ? new SuccessDataResult<Puzzle>(await this.puzzleRepository.update(newAdress))  :  new ErrorResult(errors.toString())
    }

    async delete(req: Request, res: Response, next: NextFunction) {

        const {id} = req.params

        const puzzle = await this.puzzleRepository.findById(id)
        if (!puzzle) return new ErrorResult("puzzle couldn't found")

        const deletedAdress = await this.puzzleRepository.remove(puzzle)

        return deletedAdress ? new SuccessResult("puzzle deleted") : new ErrorResult("puzzle couldnot deleted")
    }
}