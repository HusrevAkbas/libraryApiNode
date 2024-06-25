import { AppDataSource } from "../data-source";
import { Activity } from "../entity/Activity";

export class ActivityRepository {
    private adressRepository = AppDataSource.getRepository(Activity)
    
    create(activity: Activity): Activity {
        return this.adressRepository.create(activity)
    }

    findAll() {
        return this.adressRepository.find();
    }

    findById(id:string,relations?:any) {
        return this.adressRepository.findOne({
            where: {id},
            relations: relations
        })    
    }
    
    findByUserId(userId: string, relations? :any){
        return this.adressRepository.findOne({
            where: {user: {id:userId}},
            relations: relations
        })
    }

    findBy(where :Object, relations? :Object) {
        return this.adressRepository.find({
            where: where,
            relations: relations
        })    
    }

    save(activity :Activity){
        return this.adressRepository.save(activity)
    }

    update(activity :Activity){
        return this.adressRepository.save(activity)
    }

    remove(activity :Activity){
        return this.adressRepository.remove(activity)
    }

    merge(activityToChange :Activity, activity :Activity){
        return this.adressRepository.merge(activityToChange,activity)
    }

    preload(activity :Activity){
        return this.adressRepository.preload(activity)
    }
}