import { activityRoutes } from "./routes/ActivityRoutes"
import { adressRoutes } from "./routes/AdressRoutes"
import { bookRoutes } from "./routes/BookRoutes"
import { categoryRoutes } from "./routes/CategoryRoutes"
import { libraryRoutes } from "./routes/LibraryRoutes"
import { userRoutes } from "./routes/UserRoutes"
import { ImageService } from "./service/ImageService"
import { MainService } from "./service/MainService"

export const Routes = [{
    method: "get",
    route: "/shemas",
    controller: MainService,
    action: "entityAllProperties"
}, {
    method: "post",
    route: "/file",
    controller: ImageService,
    action: "add"
}, ...userRoutes, ...categoryRoutes, ...libraryRoutes, ...bookRoutes, ...adressRoutes,...activityRoutes]