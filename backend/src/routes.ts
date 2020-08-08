import {Router} from 'express'

import UserController from './controllers/UsersControllers'
import ConnectionsController from './controllers/ConnectionsController'

const Routes = Router()

Routes.post('/classes', UserController.create)
Routes.get('/classes', UserController.index)
Routes.post('/connections', ConnectionsController.create)
Routes.get('/connections', ConnectionsController.index)


export default Routes