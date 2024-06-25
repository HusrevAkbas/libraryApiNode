import { ActivityService } from "../service/ActivityService"

export const activityRoutes = [{
        method: "get",
        route: "/activities",
        controller: ActivityService,
        action: "findAll"
    }, {
        method: "post",
        route: "/activities",
        controller: ActivityService,
        action: "add"
    }, {
        method: "get",
        route: "/activities/:id",
        controller: ActivityService,
        action: "findById"
    }, {
        method: "delete",
        route: "/activities/:id",
        controller: ActivityService,
        action: "delete"
    }, {
        method: "put",
        route: "/activities",
        controller: ActivityService,
        action: "update"
    }, {
        method: "get",
        route: "/activities/q/find",
        controller: ActivityService,
        action: "findBy"
    }
]