import { AdressService } from "../service/AdressService"

export const adressRoutes = [{
        method: "get",
        route: "/adresses",
        controller: AdressService,
        action: "findAll"
    }, {
        method: "post",
        route: "/adresses",
        controller: AdressService,
        action: "add"
    }, {
        method: "get",
        route: "/adresses/:id",
        controller: AdressService,
        action: "findById"
    }, {
        method: "delete",
        route: "/adresses/:id",
        controller: AdressService,
        action: "delete"
    }, {
        method: "put",
        route: "/adresses",
        controller: AdressService,
        action: "update"
    }, {
        method: "get",
        route: "/adresses/q/find",
        controller: AdressService,
        action: "findBy"
    }
]