import cookieParser from 'cookie-parser';
import express from 'express'
import authRouter from './routes/auth.route.js'


const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
    res.status(200).json({ message: "hitted /" })
    console.log("hitted /");
})

app.use('/api/auth', authRouter)


export default app;


