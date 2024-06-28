import { Request, Response, NextFunction } from "express";
import { ActivityRepository } from "../repository/ActivityRepository";
import { ErrorResult } from "../utility/result/ErrorResult";
import { SuccessResult } from "../utility/result/SuccessResult";
import { SuccessDataResult } from "../utility/result/SuccessDataResult";
import { Activity } from "../entity/Activity";

export class ActivityService {
    private activityRepository = new ActivityRepository()

    async findAll(req: Request, res: Response, next: NextFunction){
        const activities = await this.activityRepository.findAll()
        return new SuccessDataResult<Array<Activity>>(activities)
    }

    async findById(req: Request, res: Response, next: NextFunction){
        const {id} = req.params
        const activity = await this.activityRepository.findById(id, req.query)
        return activity ? new SuccessDataResult<Activity>(activity)  : new ErrorResult("activity does not exist")
    }

    async findBy(req: Request, res: Response, next: NextFunction){
        console.log(req.query)
        const activity = await this.activityRepository.findBy(req.query)
        return activity ? new SuccessDataResult<Array<Activity>>(activity) : new ErrorResult("activity does not exist")
    }

    async add(req: Request, res: Response, next: NextFunction){
        const activity = req.body
        let act = this.activityRepository.create(activity)
        act = await this.activityRepository.save(act)
        return act ? new SuccessDataResult<Activity>(act)  : new ErrorResult("activity could not saved")
         
    }

    async update(req: Request, res: Response, next: NextFunction){

        if(!req.body.id) return new ErrorResult('id required')

        const isActivity = this.activityRepository.findById(req.body.id)
        if(!isActivity) return new ErrorResult('Activity does not exist')
            
        const activity = req.body
        let act = await this.activityRepository.preload(activity)
        act = await this.activityRepository.save(act)
        return act ? new SuccessDataResult<Activity>(act)  : new ErrorResult("activity could not saved")
         
    }

    async delete(req: Request, res: Response, next: NextFunction){
        const {id} = req.params
        const activity = await this.activityRepository.findById(id)

        if(!activity) return new ErrorResult("activity does not exist")

        const act = await this.activityRepository.remove(activity)
        return act ? new SuccessResult(`${act.title} deleted`) : new ErrorResult("Activity could not delete")
    }
    

}