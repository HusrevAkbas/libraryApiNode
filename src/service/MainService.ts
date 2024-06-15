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
                    return data.relations.filter(rel=>rel.relationType =='many-to-many')
                })
            .filter(item=>item.length>0)
            .forEach(rel=>{
                entityProperties[rel[0].entityMetadata.name][rel[0].propertyName] = rel[0].inverseEntityMetadata.name
                    console.log({propertyName: rel[0].propertyName, entity : rel[0].entityMetadata.name})
                })

        return entityProperties
    }

    //get entity properties from files
    entityClassProperties(){
        const metadata = AppDataSource.entityMetadatas
        let propertyMap = {}
        console.log(metadata.map(data=> {
            return data.relations.filter(rel=>rel.relationType =='many-to-many')
        }).filter(item=>item.length>0).map(rel=>{
            return {propertyName: rel[0].propertyName, entity : rel[0].entityMetadata.name}
        }))
        metadata.map(data=>{
            let properties = {}
            data.ownColumns.map(col=>{
                properties = {...properties, [col.propertyName]: col.type.toString()}
            })
            propertyMap = {...propertyMap, [data.name]: properties}
        })
        //console.log(propertyMap)
        return propertyMap
    }


}