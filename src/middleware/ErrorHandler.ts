import { NextFunction, Request, Response } from "express"

const errorHandler = (err: Error,req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack)
    res.status(500).json({success: false, message: err.message})
}

module.exports = errorHandler