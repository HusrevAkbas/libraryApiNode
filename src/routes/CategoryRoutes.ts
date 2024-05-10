import { CategoryService } from "../service/CategoryService";

export const categoryRoutes = [
    {
        method: "get",
        route: "/category",
        controller: CategoryService,
        action: "findAll"
    },{
        method: "get",
        route: "/category/:id",
        controller: CategoryService,
        action: "findById"
    }, {
        method: "post",
        route: "/category",
        controller: CategoryService,
        action: "add"
    }, {
        method: "delete",
        route: "/category/:id",
        controller: CategoryService,
        action: "delete"
    }, {
        method: "put",
        route: "/category/:id",
        controller: CategoryService,
        action: "update"
    }
]