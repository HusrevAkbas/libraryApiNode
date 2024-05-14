import { bookRoutes } from "./routes/BookRoutes"
import { categoryRoutes } from "./routes/CategoryRoutes"
import { libraryRoutes } from "./routes/LibraryRoutes"
import { userRoutes } from "./routes/UserRoutes"
import { MainService } from "./service/MainService"

export const Routes = [{    
    method: "get",
    route: "/",
    controller: MainService,
    action: "urlpathlist"
},...userRoutes,...categoryRoutes, ...libraryRoutes, ...bookRoutes]