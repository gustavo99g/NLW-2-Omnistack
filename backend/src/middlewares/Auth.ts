import jwt from 'jsonwebtoken'
import {Request, Response,NextFunction} from 'express-serve-static-core'
import {promisify} from 'util'



export default async (req:Request, res:Response, next:NextFunction) =>{
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.json({message:'Token not provided'})
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded =<any> await promisify(jwt.verify)(token, 'secret')
        
        const {id} = decoded
        req.user = id
        next()
    }catch(err){
        return res.json({message:'Token invalid'})
    }

}