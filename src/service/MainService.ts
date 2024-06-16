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

        metadata.map(data => {
            let propertyNames = {}
            data.ownColumns.map(col => {
                propertyNames = {...propertyNames, [col.propertyName]: col.type.toString()}
            })
            entityProperties = {...entityProperties, [data.name]: propertyNames }
        })

        metadata
            .map(data=> {
                    return data.relations.filter(rel=>rel.relationType !== undefined)
                })
            .filter(item=>item.length>0)
            .forEach(rels=>{
                rels.forEach(rel=>{
                    entityProperties[rel.entityMetadata.name][rel.propertyName] = rel.inverseEntityMetadata.name
                })
                
            })

        return entityProperties
    }
}