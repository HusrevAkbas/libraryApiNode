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
    const userResponseHandler = require('./middleware/UserResponseHandler')

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

            //remove sensible data from user
            userResponseHandler(result)

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
    const server = app.listen((process.env.PORT || 3000),()=>{
        console.log(server.address()) 
    })
    
}).catch(error => console.log(error))

