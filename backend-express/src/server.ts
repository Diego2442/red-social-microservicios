import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import authRouter from './routes/authRouter'
import postRouter from './routes/postRouter'
import socketio, {Server} from 'socket.io'
import http from 'http'
import cors from 'cors'
import socketHandler from './sokets/socketHandler'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexión a postgresql establecida'))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('Conexión fallida a postgresql establecida'))
    }
}
connectDB()

const app = express()

const allowedOrigins = process.env.ORIGIN?.split(',') ?? []

app.use(cors({
    origin: (origin, callback) => {
        // Permite peticiones sin origin (como desde curl o Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/auth', authRouter)

app.use('/api/posts', postRouter)


// Servidor HTTP y Socket.IO
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

// Importa y aplica los eventos desde otro archivo
socketHandler(io)

export default server