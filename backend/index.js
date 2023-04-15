import "./config.js"
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { connection } from './db.js'
import { resetPasswordController, resetPasswordRequestController, signInController, signUpController } from "./controllers/auth.controller.js"

const PORT = process.env.PORT

const app = express()

const formReader = multer()

await connection()

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())

app.use((error, _, res, next) => {
    res.status(500).json({ error: error.message })
})

app.post("/api/auth/signup", formReader.none(), signUpController);
app.post("/api/auth/signin", formReader.none(), signInController);
app.post("/api/auth/requestResetPassword", resetPasswordRequestController);
app.post("/api/auth/resetPassword", resetPasswordController);

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})