import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    const cors = require('cors')
    const security = require("./middleware/SecurityService")
    const errorHandler = require("./middleware/ErrorHandler")
    const checkRequiredFormFields = require("./middleware/CheckRequired")
    const multer = require('./middleware/FileParser')
    const stringToBoolean = require('./middleware/QueryParamsStringToBoolean')

    app.use(cors())
    app.use(bodyParser.json())
    app.use(stringToBoolean)
    app.use(multer)
    app.use(security)
    app.use(checkRequiredFormFields)
    
    const asyncHandler = fn => (req: Request,res:Response,next) => {
        Promise.resolve(fn(req,res,next)).catch(next)
    }

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, asyncHandler(async (req: Request, res: Response, next: Function) => {
            const result = await (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        }))
    })


    app.use(errorHandler)
    // setup express app here
    // ...

    // start express server
    app.listen(process.env.PORT || 3000)
/*
    // insert new users for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
    "email": "email@m.c",
    "password": "pass",
    "username": "first admin",
    "profileImgUrl":"url",
    "status": true,
    "role": "ADMIN"
})
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            firstName: "Phantom",
            lastName: "Assassin",
            age: 24
        })
    )
*/
    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))

