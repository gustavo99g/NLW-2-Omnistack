import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connection'
import HourToMinutes from '../utils/HourToMinutes'



interface scheduleItem{
    week_day:number,
    from:string,
    to:string
}

export default {

    
    async index(req:Request, res:Response){
        const filters = req.query
       
      
        
        let query = db('classes')
                   
            if(filters.week_day){
                query.whereExists(function(){
                    this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id`=`classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day`=??', [Number(filters.week_day as string)])
                })
            }
                if(filters.time){
                    const timeInMinutes = HourToMinutes(filters.time as string)
                    console.log(timeInMinutes)
                    query.whereExists(function(){
                        this.select('class_schedule.*')
                        .from('class_schedule')
                        .whereRaw('`class_schedule`.`class_id`=`classes`.`id`')
                        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                }
                )
            }
            
            
            if (filters.subject){
                query.where('classes.subject', '=', filters.subject as string)
            }
            query
            .join('users', 'classes.user_id', '=' ,'users.id')      
            .select(['classes.*', 'users.name','users.bio', 'users.whatsapp', 'users.avatar', 'users.email'])       
            .distinct()

            const classes = await query
           
            const classes_schedule = classes.map(async classe =>{
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
    },

    async create(req: Request, res:Response){
        const {email, password } = req.body
        const name = `${req.body.name} ${req.body.lastName}`

        try{
            const user = await db('users').where({email}).select('email')
            if (user.length >0){
                return res.json({message:'Email already in use'})
            }    

        }catch(err){
            return res.json({message:err.message})
        }
        const passwordHash = await bcrypt.hash(password, 8)

        const trx =await db.transaction()
        try{    
            const user = await trx('users').insert({
                name,
                email,
                password:passwordHash
            })
            const user_id = user[0]

            const classes =await trx('classes').insert({user_id})
            const class_id = classes[0]
            await trx('class_schedule').insert({class_id})
            await trx.commit()

        }catch(err){
            await trx.rollback()
            return res.json({message:err.message})
            
        }

        return res.status(201).send()
    },

    async show(req: Request, res:Response){
        const id = req.user
        const user = await db('users').where('users.id',id)
        .join('classes', 'users.id','=','classes.user_id')
         .select(['classes.subject', 'classes.id as classes_id','classes.cost','users.*'])
        .distinct()
        
        const schedule = await db('class_schedule').where('class_id', user[0].classes_id)
        const {name:nameFull} = user[0]
        const [name,lastName] = nameFull.split(' ')

        user[0].password = undefined
        user[0].resetToken = undefined
        user[0].resetTokenExpires = undefined
        user[0].name = name
        user[0].lastName = lastName 
         
        return res.json({user,schedule})
    },
    async update(req: Request, res: Response){
        const id = req.user
        const {bio,whatsapp,avatar,email,cost,schedule,subject} = req.body
        const name = `${req.body.name} ${req.body.lastName}`
        
        const trx =await db.transaction()
        try{
            const user = await trx('users').where({email}).select('email','id')
            if (user.length > 0){
                if(user[0].id != id){
                    
                    return res.json({message:'Email already in use'})
                }
            }    

        }catch(err){
            return res.json({message:err.message})
        }


        try{
           await trx('users').where({id}).update({
                name,
                bio,
                whatsapp,
                avatar,
                email
            })

           
            
            await trx('classes').where({user_id:id}).update({
                subject,
                cost,
                user_id:id
            })
            const classes_id = await trx('classes').where({user_id:id})
            
            const class_id = classes_id[0].id   
    
            const clasSchedule = schedule.map((item:scheduleItem)=>{
                return {
                    class_id,
                    week_day: item.week_day,
                    from: HourToMinutes(item.from),
                    to:HourToMinutes(item.to)
                }
            })

            
            await trx('class_schedule').where({class_id}).delete()
            await trx('class_schedule').insert(clasSchedule)
            
            await trx.commit()
           

        }catch(err){
            await trx.rollback()
            return res.json({message:err.message})
            
        }

        return res.status(201).send()
    }
}