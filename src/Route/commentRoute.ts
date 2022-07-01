import {Router} from 'express'
import { commentController } from '../Controller/commentController'
const route = Router()
//route starts here
route.get('/', commentController.getAllComment)
route.get('/user/:id', commentController.getCommentById)
route.post('/create/:id', commentController.createData)
route.put('/update/user/:id/comment/:Cid', commentController.updateComment)
route.delete('/:Cid/delete/:id/user', commentController.deleteComment)
export default route

 