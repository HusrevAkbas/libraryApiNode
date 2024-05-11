import { categoryRoutes } from "./routes/CategoryRoutes"
import { libraryRoutes } from "./routes/LibraryRoutes"
import { userRoutes } from "./routes/UserRoutes"

export const Routes = [...userRoutes,...categoryRoutes, ...libraryRoutes]