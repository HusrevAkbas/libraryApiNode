import { AuthenticationService } from "../service/AuthenticationService";

export const authenticationRoutes =[
    {
        method: "post",
        route: "/register",
        controller: AuthenticationService,
        action: "register"
    },
    {
        method: "post",
        route: "/login",
        controller: AuthenticationService,
        action: "login"
    }
]