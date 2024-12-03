import http from 'node:http'
import app from './app.js'
import dotenv from 'dotenv'
import { connectDb } from './db/mongodb.js'

dotenv.config()

const port = process.env.PORT || 8000

const server = http.createServer(app)

connectDb()

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
