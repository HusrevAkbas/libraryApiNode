import { UserService } from "../service/UserService";

export const userRoutes = [
    {
        method: "get",
        route: "/users",
        controller: UserService,
        action: "findAll"
    },{
        method: "get",
        route: "/users/:id",
        controller: UserService,
        action: "findById"
    }, {
        method: "post",
        route: "/users",
        controller: UserService,
        action: "add"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: UserService,
        action: "delete"
    }, {
        method: "put",
        route: "/users/:id",
        controller: UserService,
        action: "update"
    }
]