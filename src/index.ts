import { AppDataSource } from "./data-source"
import * as bodyParser from "body-parser"
import * as express from 'express'
import route from './Route/commentRoute'
import router from './Route/userRoute'
import profileRoute from './Route/profileRoute'
import friendRoute from './Route/friendRoute'
const app = express()

AppDataSource.initialize().then(async () => {
// app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/user', router)
app.use('/comment',route)
app.use('/profile', profileRoute)
app.use('/friends', friendRoute)
app.listen(5000, ()=>console.log("App Running"))


}).catch(error => console.log(error))
