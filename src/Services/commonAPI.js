
import axios from "axios";

export const commonAPI = async(httpMethod,url,reqBody,reqHeader)=>{
    const reqConfig = {
        method: httpMethod,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader : {"Content-Type" : "application/json"}
    }
    return await axios(reqConfig).then((response)=>{
        return response
    }).catch((err)=>{
        return err
    })
}


