import { LibraryService } from "../service/LibraryService";

export const libraryRoutes = [
    {
        method: "get",
        route: "/libraries",
        controller: LibraryService,
        action: "findAll"
    },{
        method: "get",
        route: "/libraries/:id",
        controller: LibraryService,
        action: "findById"
    }, {
        method: "post",
        route: "/libraries",
        controller: LibraryService,
        action: "add"
    }, {
        method: "delete",
        route: "/libraries/:id",
        controller: LibraryService,
        action: "delete"
    }, {
        method: "put",
        route: "/libraries/:id",
        controller: LibraryService,
        action: "update"
    }, {
        method: "get",
        route: "/libraries/user/:id",
        controller: LibraryService,
        action: "findByUserId"
    }
]