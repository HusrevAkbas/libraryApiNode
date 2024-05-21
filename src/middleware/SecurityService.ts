import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"

const securityService = (req: Request, res: Response, next: NextFunction) => {
        try {
        const {path} = req
        if(path == '/register' || path == '/login') return next()
        if(!req.headers.authorization) return res.json({message: "you need a token. please login"})

        const {authorization} = req.headers
        const token = authorization.slice(7)

        if(!authorization.startsWith('Bearer ')) return res.json({message: "your token is invalid"})

        const isTokenValid = jwt.verify(token, process.env.SECRET_KEY)
        next()
} catch (err) {res.json({error: err.message})}

        
}

module.exports = securityService