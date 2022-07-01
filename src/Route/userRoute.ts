import {Router} from 'express'
import { userController } from '../Controller/userController'
import route from './commentRoute'
const router:Router = Router()
router.post('/create', userController.createuser )
router.get('/', userController.getAllUser)
router.get('/:id', userController.getUserById)
router.put('/edit/:id', userController.updateUser)
route.delete('/remove/:id', userController.removeUser)

export default router