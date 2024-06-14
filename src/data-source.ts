import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Category } from "./entity/Category"
import { PersonalUser } from "./entity/PersonalUser"
import { Library } from "./entity/Library"
import { Book } from "./entity/Book"
import { Shelfitem } from "./entity/Shelfitem"
import { Adress } from "./entity/Adress"
import { Activity } from "./entity/Activity"
require("dotenv").config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, Category, PersonalUser, Library, Book, Shelfitem, Adress, Activity],
    migrations: [],
    subscribers: [],
})
