import {Router} from 'express'

import UserController from './controllers/UsersControllers'
import ConnectionsController from './controllers/ConnectionsController'
import AuthControllers from './controllers/AuthControllers'
import Auth from './middlewares/Auth'

const Routes = Router()

Routes.post('/users', UserController.create)
Routes.post('/login', AuthControllers.create)
Routes.get('/connections', ConnectionsController.index)
Routes.post('/forgetPassword', AuthControllers.forgetPassword)

Routes.use(Auth)

Routes.get('/users', UserController.show)
Routes.put('/users', UserController.update)




Routes.get('/classes', UserController.index)
Routes.post('/connections', ConnectionsController.create)



export default Routes