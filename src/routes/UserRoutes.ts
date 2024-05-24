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
        method: "delete",
        route: "/users/:id",
        controller: UserService,
        action: "delete"
    }, {
        method: "put",
        route: "/users/:id",
        controller: UserService,
        action: "update"
    }, {
        method: "get",
        route: "/user",
        controller: UserService,
        action: "findByUsername"
    }, {
        method: "get",
        route: "/isuser",
        controller: UserService,
        action: "isUsernameExist"
    }, {
        method: "get",
        route: "/isemail",
        controller: UserService,
        action: "isEmailExist"
    }
]