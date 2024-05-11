import { CategoryService } from "../service/CategoryService";

export const categoryRoutes = [
    {
        method: "get",
        route: `/categories`,
        controller: CategoryService,
        action: "findAll"
    },{
        method: "get",
        route: "/categories/:id",
        controller: CategoryService,
        action: "findById"
    }, {
        method: "post",
        route: "/categories",
        controller: CategoryService,
        action: "add"
    }, {
        method: "delete",
        route: "/categories/:id",
        controller: CategoryService,
        action: "delete"
    }, {
        method: "put",
        route: "/categories/:id",
        controller: CategoryService,
        action: "update"
    }
]