import {Router} from 'express'
import {profileController} from '../Controller/profileController'
const profileRoute = Router()
profileRoute.post('/create/:id',profileController.createProfile )
profileRoute.get('/',profileController.getAllProfile )
profileRoute.get('/user/:id', profileController.getUserProfile)
profileRoute.put('/user/:id/', profileController.updateProfile)
profileRoute.delete('/:Pid/delete/:id/user', profileController.deleteProfile)

export default profileRoute