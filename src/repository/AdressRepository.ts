import { AppDataSource } from "../data-source";
import { Adress } from "../entity/Adress";

export class AdressRepository {
    private adressRepository = AppDataSource.getRepository(Adress)
    
    create(adress: Adress): Adress {
        return this.adressRepository.create(adress)
    }

    find() {
        return this.adressRepository.find();
    }

    one(id:number,relations?:any) {
        return this.adressRepository.findOne({
            where: {id},
            relations: relations
        })    
    }

    save(adress :Adress){
        return this.adressRepository.save(adress)
    }

    update(adress :Adress){
        return this.adressRepository.save(adress)
    }

    remove(adress :Adress){
        return this.adressRepository.remove(adress)
    }

    merge(adressToChange :Adress, adress :Adress){
        return this.adressRepository.merge(adressToChange,adress)
    }

    preload(adress :Adress){
        return this.adressRepository.preload(adress)
    }
}