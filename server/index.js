import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import authRouter from './routes/authRouter.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)
app.use("/auth", authRouter)
app.use("/users", userRoutes)

app.get('/', async (req, res) => {
    res.send('Hello From DALL-E!');
})

const PORT = 8080

const startServer = async () => {
    try {
        connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => console.log(`Server Working on PORT: ${PORT}`))
    } catch (e) {
        return res.status(500).end()
    }

}

startServer()