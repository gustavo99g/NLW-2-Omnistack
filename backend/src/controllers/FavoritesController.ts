import { Request, Response } from "express";
import db from "../database/connection";



export default{
    async create(req:Request, res:Response){
        const {proffy_id} = req.body
        const user_id = req.user
        const favorites = await db('favorites').where({user_id,proffy_id})
            
        if (favorites.length === 0){
            await db('favorites').insert({
                user_id,
                proffy_id
            })
        }else{
            await db('favorites').where({
                proffy_id,
                user_id
            })
            .delete()
        }
        

        return res.status(201).send()
    },
    async show(req:Request, res:Response){
        const user_id = req.user

        const favorites = await db('favorites').where('favorites.user_id',user_id)
        .join('users', 'users.id' , '=', 'favorites.proffy_id')
        .join('classes', 'users.id', '=', 'classes.user_id')
        .select(['classes.*','users.name','users.bio', 'users.whatsapp', 'users.email','users.avatar', 'users.id'])
        
          

        const classes_schedule = favorites.map(async classe =>{
            const schedule = await db('class_schedule')
            .where('class_schedule.class_id', classe.id)
            .select(['class_schedule.to','class_schedule.from', 'class_schedule.week_day'])
            return {
                class:classe,
                schedule
            }            
            
        })
       
        const result = await Promise.all(classes_schedule)

        return res.json(result)
    }

}