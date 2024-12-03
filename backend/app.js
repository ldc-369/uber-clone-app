import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRouter } from './routers/user-router.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api', userRouter)
app.use('/api/user', userRouter)

export default app
