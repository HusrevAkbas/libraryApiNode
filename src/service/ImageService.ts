import { NextFunction, Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { SuccessDataResult } from "../utility/result/SuccessDataResult";

export class ImageService {
    async add(req:Request, res:Response, next: NextFunction){
        const result = await cloudinary.uploader.upload(req.file.path,{
            unique_filename:true,
            folder:`libraryApp/${req.body.target}`
        })
        return new SuccessDataResult({url:result.secure_url})
    }
}