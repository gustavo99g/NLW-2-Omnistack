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

        if(!filters.week_day || !filters.subject || !filters.time){
            return res.status(400).json({
                error:'Missing filters to search classes'
            })
        }
        const timeInMinutes = HourToMinutes(filters.time as string)

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id`=`classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day`=??', [Number(filters.week_day as string)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])

            })
            .where('classes.subject', '=', filters.subject as string)
            .join('users', 'classes.user_id', '=' ,'users.id')
            .join('class_schedule', 'classes.id', 'class_schedule.class_id')
            .select(['classes.*','class_schedule.*', 'users.name','users.bio', 'users.whatsapp', 'users.avatar', 'users.email'])
           
          
            console.log(classes)
            

        return res.json(classes)
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

        
        try{    
            await db('users').insert({
                name,
                email,
                password:passwordHash
            })

        }catch(err){
            return res.json({message:err.message})
        }

        return res.status(201).send()
    },

    async show(req: Request, res:Response){
        const id = req.user



        const user = await db('users').where({id})

        const {name:nameFull} = user[0]
        const [name,lastName] = nameFull.split(' ')

        user[0].password = undefined
        user[0].name = name
        user[0].lastName = lastName
         
        return res.json({user})
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
            const classes_id = await trx('classes').insert({
                subject,
                cost,
                user_id:id
            })
            const class_id = classes_id[0]
    
            const clasSchedule = schedule.map((item:scheduleItem)=>{
                return {
                    class_id,
                    week_day: item.week_day,
                    from: HourToMinutes(item.from),
                    to:HourToMinutes(item.to)
                }
            })
            await trx('class_schedule').insert(clasSchedule)

            await trx.commit()

        }catch(err){
            await trx.rollback()
            return res.json({message:err.message})
            
        }

        return res.status(201).send()
    }
}