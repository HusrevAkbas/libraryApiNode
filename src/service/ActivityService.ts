import { Request, Response, NextFunction } from "express";
import { ActivityRepository } from "../repository/ActivityRepository";
import { ErrorResult } from "../utility/result/ErrorResult";
import { SuccessResult } from "../utility/result/SuccessResult";

export class ActivityService {
    private activityRepository = new ActivityRepository()

    async findAll(req: Request, res: Response, next: NextFunction){
        return await this.activityRepository.find()
    }

    async findById(req: Request, res: Response, next: NextFunction){
        const {id} = req.params
        const activity = await this.activityRepository.findById(id)
        return activity ? activity : new ErrorResult("activity does not exist")
    }

    async add(req: Request, res: Response, next: NextFunction){
        const activity = req.body
        let act = this.activityRepository.create(activity)
        act = await this.activityRepository.save(act)
        return act ? act : new ErrorResult("activity could not saved")
         
    }

    async update(req: Request, res: Response, next: NextFunction){
        const activity = req.body
        let act = await this.activityRepository.preload(activity)
        act = await this.activityRepository.save(act)
        return act ? act : new ErrorResult("activity could not saved")
         
    }

    async delete(req: Request, res: Response, next: NextFunction){
        const {id} = req.params
        const activity = await this.activityRepository.findById(id)

        if(!activity) return new ErrorResult("activity does not exist")

        const act = await this.activityRepository.remove(activity)
        return act ? new SuccessResult(`${act.title} deleted`) : new ErrorResult("Activity could not delete")
    }
    

}