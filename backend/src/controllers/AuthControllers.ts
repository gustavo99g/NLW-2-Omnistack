import jwt from 'jsonwebtoken'
import db from '../database/connection'
import bcrypt from 'bcrypt'

import {Request,Response} from 'express'

export default {
    async create(req: Request, res: Response){
        const {email, password} = req.body

        try{
            const user = await db('users').where({email})
            const login = await bcrypt.compare(password,user[0].password)
            if(login){
                const token = jwt.sign({id:user[0].id},"secret")
                return res.json({token})

            }else{
                return res.json({message:'Email or password invalid'})
            }

        }catch(err){
            return res.json({message:err.message})
        }    
    },
    async forgetPassword(req: Request, res:Response){
        const {email} = req.body

        const user = await db('users').where({email})

        if(user.length === 0){
            return res.json({message:'User not found'})
        }

        return res.json({user})
    }
}