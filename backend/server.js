import express from 'express'
import connectToDb from './config/db.js';
const app = express()
const port = 9000;
import cors from 'cors'


app.use(express.json())

app.use(cors())


app.set('view engine','ejs')
connectToDb()
app.get('/',(req,res)=>{
   res.send('welcome home')
})




import userRoutes from './routes/userRoutes.js'

import postRoutes from "./routes/postRoutes.js";
app.use('/post',postRoutes)


app.use('/user',userRoutes)



app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})