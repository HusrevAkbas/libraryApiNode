import { NextFunction, Request, Response } from "express";

const stringToBoolean = (req:Request,res: Response ,next: NextFunction) => {
    if(req.query){
        const queryString = JSON.stringify(req.query)
        const queryBoolean = queryString.replace('"true"','true').replace('"false"','false')

        req.query = JSON.parse(queryBoolean)
    }
    next()
}

module.exports = stringToBoolean