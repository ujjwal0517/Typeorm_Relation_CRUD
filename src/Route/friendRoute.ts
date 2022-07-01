import {Router} from 'express'
import { friendController } from '../Controller/friendController'
const friendRoute = Router()
friendRoute.post('/:id/:fid', friendController.createfriend)
friendRoute.get('/:id', friendController.getAllFriend)
friendRoute.delete('/:id/:fid', friendController.removeFriend)
export default friendRoute