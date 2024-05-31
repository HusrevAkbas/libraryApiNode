import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

export class ImageService {
    async add(req:Request, res:Response, next: NextFunction){
        console.log(req.file)
        console.log(req.body)
        console.log(req.originalUrl)
        const result = await cloudinary.uploader.upload(req.file.path,{
            unique_filename:true,
            folder:`libraryApp/${req.body.target}`
        })
        return {success: true, url: result.secure_url}
    }
}