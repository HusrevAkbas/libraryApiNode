import { BookService } from "../service/BookService";

export const bookRoutes = [{
    method: "get",
    route: "/books",
    controller: BookService,
    action: "findAll"
}, {
    method: "post",
    route: "/books",
    controller: BookService,
    action: "addBook"
}, {
    method: "get",
    route: "/books/:id",
    controller: BookService,
    action: "findById"
}, {
    method: "delete",
    route: "/books/:id",
    controller: BookService,
    action: "delete"
}, {
    method: "put",
    route: "/books/:id",
    controller: BookService,
    action: "update"
}

]