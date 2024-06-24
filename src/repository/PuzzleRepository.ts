import { AppDataSource } from "../data-source";
import { Puzzle } from "../entity/Puzzle";

export class PuzzleRepository {
    constructor(){}

    private puzzleRepository = AppDataSource.getRepository(Puzzle)

    find() {
        return this.puzzleRepository.find();
    }

    findById(id:string, relations?: any) {
        return this.puzzleRepository.findOne({
            where: {id},
            relations: relations
        })    
    }

    save(puzzle:Puzzle){
        return this.puzzleRepository.save(puzzle)
    }

    update(puzzle:Puzzle){
        return this.puzzleRepository.save(puzzle)
    }

    remove(puzzle:Puzzle){
        return this.puzzleRepository.remove(puzzle)
    }

    merge(toChange :Puzzle, puzzle :Puzzle){
        return this.puzzleRepository.merge(toChange,puzzle)
    }

    preload(puzzle: Puzzle){
        return this.puzzleRepository.preload(puzzle)
    }
}