import { UserController } from "./controller/UserController"
import { UserService } from "./service/UserService"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserService,
    action: "findAll"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserService,
    action: "findById"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}]