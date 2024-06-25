import { UserResponse } from "../DTO/UserResponse"

const userResponseHandler = (result: any) => {
    console.log(result)
    if(Array.isArray(result.data)){
        if(Object.keys(result.data[0]).includes('user')){
            result = result.data.map((item: any) => {        
                if(item.user !==null && Object.keys(item.user).includes('username')){
                    item.user = new UserResponse(item.user)
                }
                return item
            })
        }
    } else {
        if(Object.keys(result.data).includes('user')){
            if(result.data.user !== null && Object.keys(result.data.user).includes('username')){
                result.data.user = new UserResponse(result.data.user)                
            }
        }
    }
    return result
}

module.exports = userResponseHandler