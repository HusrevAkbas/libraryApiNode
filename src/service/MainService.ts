import { getMetadataArgsStorage } from "typeorm";
import { AppDataSource } from "../data-source";
import { Routes } from "../routes";

export class MainService {
    urlpathlist() {
        return Routes;
    }

    //get entity properties from metadata
    entityAllProperties() {
        const metadata = AppDataSource.entityMetadatas
            let entityProperties = {}
        const metadatanames = metadata.map(data => {
            let propertyNames = {}
            data.columns.map(col => { 
                console.log(col.type.toString())
                propertyNames = {...propertyNames, [col.propertyName]: col.type.toString()}
            })
            entityProperties = {...entityProperties, [data.name]: propertyNames }
        })
        //console.log(Object.keys(metadata[7]))
        console.log(metadata[8].name)
        //console.log(metadata[8].columns.map(col => col.propertyName))
        return entityProperties
    }

    //get entity properties from files
    entityClassProperties(){

    }


}