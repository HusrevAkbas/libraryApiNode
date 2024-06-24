import { PuzzleService } from "../service/PuzzleService"

export const puzzleRoutes = [{
        method: "get",
        route: "/puzzles",
        controller: PuzzleService,
        action: "findAll"
    }, {
        method: "post",
        route: "/puzzles",
        controller: PuzzleService,
        action: "add"
    }, {
        method: "get",
        route: "/puzzles/:id",
        controller: PuzzleService,
        action: "findById"
    }, {
        method: "delete",
        route: "/puzzles/:id",
        controller: PuzzleService,
        action: "delete"
    }, {
        method: "put",
        route: "/puzzles",
        controller: PuzzleService,
        action: "update"
    }
]