import { categoryRoutes } from "./routes/CategoryRoutes"
import { userRoutes } from "./routes/UserRoutes"
import { UserService } from "./service/UserService"

export const Routes = [...userRoutes,...categoryRoutes]