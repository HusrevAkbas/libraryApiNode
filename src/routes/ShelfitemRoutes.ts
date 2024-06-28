import { ShelfitemService } from "../service/ShelfitemService";

export const shelfitemRoutes = [{
        method: "get",
        route: "/shelfitems",
        controller: ShelfitemService,
        action: "findAll"
    }, {
        method: "get",
        route: "/shelfitems/:id",
        controller: ShelfitemService,
        action: "findById"
    }, {
        method: "delete",
        route: "/shelfitems/:id",
        controller: ShelfitemService,
        action: "delete"
    }, {
        method: "get",
        route: "/shelfitems/q/find",
        controller: ShelfitemService,
        action: "findBy"
    }
]