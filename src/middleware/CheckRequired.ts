import { NextFunction, Request, Response } from "express"
import { Routes } from "../routes"
import { AppDataSource } from "../data-source"

const checkRequired = (req:Request,res: Response ,next: NextFunction)=>{

    const {path,method} = req
    
    const newpath = path.split('/')[1]

    if(req.path == '/login' || path == '/file'){
        next()
        return
    }

    if(method == ('POST')) {
        const className = getClassName(`/${newpath}`)
        const metadata = getMappedMetadata(className)

        const missingFields = []

        metadata.forEach(requiredField => {
            if(!req.body[requiredField.propertyName]){
                missingFields.push(requiredField.propertyName)
            }
        })

        if(missingFields.length!==0){
            res.send({success:false, message: `required fields missing: ${missingFields}`})
        } else {
            next()
        }
    } else {
        next()
    }

    
}

function getClassName(path:string){    
    const routes = Routes.filter(route => {
        if(route.route == path) return route
    })
    return routes[0].controller.name.replace('Service','')
}

function getMappedMetadata(className: string){
        return AppDataSource.getMetadata(className).ownColumns.map(column=>{
            return {isNullable: column.isNullable,
            default: column.default,
            propertyName: column.propertyName,
            databasePath:column.databasePath,
            referencedColumn:column.referencedColumn,
            target:column.target}
        }).filter(item=>{
            return item.isNullable == false && item.default == undefined && item.propertyName !== 'id'
        })
        .filter(item=>{
            if(!(className == 'User' && item.propertyName == 'name')) return item
        })

}

module.exports = checkRequired