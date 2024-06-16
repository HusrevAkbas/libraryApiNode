import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import { ErrorResult } from "../utility/result/ErrorResult";

const securityService = (req: Request, res: Response, next: NextFunction) => {
        try {
                const {path} = req
                if(path == '/register' || path == '/login' || path == '/isuser' || path=='/isemail') {
                        next()
                        return
                }
                if(!req.headers.authorization) {
                        res.send(new ErrorResult("please login to proceed"))
                        return
                }

                const {authorization} = req.headers

                if(!authorization.startsWith('Bearer ')) {
                        res.json(new ErrorResult("unauthorized access"))
                        return
                }

                const token = authorization.slice(7)
                const isTokenValid = jwt.verify(token, process.env.SECRET_KEY)

                next()

        } catch (err) {res.send(new ErrorResult("unauthorized access"))}
}

module.exports = securityService