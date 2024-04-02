import Jwt  from "jsonwebtoken";
import logger from "../configs/logger.config";
export const sign = async (payload, expiresIn, secret) => {
    return new Promise((resolve, reject) => {
        Jwt.sign(
            payload,
            secret,
            {expiresIn: expiresIn},
            (err, token) => {
                if (error) {
                    logger.error(error);
                    reject(error);
                } else {
                    resolve(token)
                }
            }
        )
    })
}

export const verify = async (token, secret) => {
    return new Promise((resolve, reject)=>{
        Jwt.verify(token, secret, (error, payload) =>{
            if(error){
                logger.error(error);
                resolve(null)
            }else {
                resolve(payload)
            }
        })
    })
}