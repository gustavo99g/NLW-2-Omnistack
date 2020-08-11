import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {randomBytes} from 'crypto'
import {Request,Response} from 'express'

import sendMail from '../utils/mail'
import db from '../database/connection'

export default {
    async create(req: Request, res: Response){
        const {email, password} = req.body
        try{          
            const user = await db('users').where({email})
            if(user.length ===0){
                return res.json({message:'Email or password invalid'})
            }
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

        const user = await db('users').where({email}).select('id')

        if(user.length === 0){
            return res.json({message:'User not found'})
        }
        const resetToken = randomBytes(24).toString('hex')
        const resetTokenExpires = Date.now() + 30 *60 *1000

        const resetLink = `${req.protocol}://${req.get('host')}/reset/${resetToken}`
        
        const message = `Clique aqui para recuperar a sua senha \n${resetLink} \nCaso nao tenha sido voce que pediu a recuperação de senha ignore esse e-mail
        `
        try{
            await db('users').where({email}).update({
                resetTokenExpires,
                resetToken
            })
        }catch(err){
            return res.json({message:err.message})
        }

        await sendMail({
            subject:'RECUPERAÇÂO DE SENHA (VALIDO POR MINUTOS)',
            to:email,
            text:message
        })
        return res.json({message:'Email sent'})
    },
    async resetPassword (req: Request, res:Response){
        const {resetToken} = req.params
        const {password} = req.body

        try{
            const user = await db('users').where({resetToken})
            if(user.length === 0 || user[0].resetTokenExpires < Date.now()){
                return res.json({message:'Reset token invalid or expired'})
            }
            const {id} = user[0]

            const passwordHash = await bcrypt.hash(password, 8)
            await db('users').where({id}).update({
                password:passwordHash,
                resetToken:null,
                resetTokenExpires:null
            })

            return res.json({message:'Success'})


        }catch(err){
            return res.json({message:err.message})
        }
        

        return res.send()
    }
}