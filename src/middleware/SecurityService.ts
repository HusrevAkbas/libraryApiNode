import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"

const securityService = (req: Request, res: Response, next: NextFunction) => {
        try {
                const {path} = req
                if(path == '/register' || path == '/login' || path == '/isuser' || path=='/isemail') {
                        next()
                        return
                }
                if(!req.headers.authorization) {
                        res.send({message: "please login to proceed"})
                        return
                }

                const {authorization} = req.headers

                if(!authorization.startsWith('Bearer ')) {
                        res.json({success: false, message: "unauthorized access"})
                        return
                }

                const token = authorization.slice(7)
                const isTokenValid = jwt.verify(token, process.env.SECRET_KEY)

                next()

        } catch (err) {res.send({success: false, message: "unauthorized access"})}
}

module.exports = securityService