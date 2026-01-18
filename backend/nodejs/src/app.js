import cookieParser from 'cookie-parser';
import express from 'express'
import authRouter from './routes/auth.route.js'
import reqRouter from './routes/req.route.js';
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
    res.status(200).json({ message: "hitted /" })
    console.log("hitted /");
})

app.use('/api/auth', authRouter)
app.use('/api/request', reqRouter)

export default app;


