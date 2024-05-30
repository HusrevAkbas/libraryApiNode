import { bookRoutes } from "./routes/BookRoutes"
import { categoryRoutes } from "./routes/CategoryRoutes"
import { libraryRoutes } from "./routes/LibraryRoutes"
import { userRoutes } from "./routes/UserRoutes"
import { ImageService } from "./service/ImageService"
import { MainService } from "./service/MainService"

export const Routes = [{
    method: "get",
    route: "/",
    controller: MainService,
    action: "urlpathlist"
}, {
    method: "post",
    route: "/file",
    controller: ImageService,
    action: "add"
},...userRoutes, ...categoryRoutes, ...libraryRoutes, ...bookRoutes]