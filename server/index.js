import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import path from 'path'

dotenv.config()
import { userRouter } from './routes/user.js'

const __dirname = path.resolve()

const app = express()

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', userRouter)

mongoose.connect('mongodb://127.0.0.1:27017/auth')

app.listen(process.env.PORT, () => {
    console.log("server is running")
})