import express from 'express'
import dotenv from 'dotenv'
import dbcon from './Db/db.js'
import cors from 'cors'
import routers from './Routes/routers.js'





const app = express()
dotenv.config()
dbcon()
app.use(express.json());
app.use(cors());
app.use('/api/',routers)
app.listen(process.env.PORT, ()=>{
    console.log("app is listening ....")
})

