import { NextFunction, Request, Response } from "express";

const securityService = (req: Request, res: Response, next: NextFunction) => {
        console.log(req.path)
        const {path} = req
        if(path == '/register' || path == '/login') return next()
        console.log(req.headers)
        if(!req.headers.token) return res.json({message: "you need a token. please login"})

        

        res.json({message: req.headers.token})

        
}

module.exports = securityService