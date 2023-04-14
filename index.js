import "./config.js"
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import { connection } from './db.js'
import { resetPasswordController, resetPasswordRequestController, signUpController } from "./controllers/auth.controller.js"

const PORT = process.env.PORT

const app = express()

await connection()

app.use(cors())
app.use(express.json())
app.use((error, _, res, next) => {
    res.status(500).json({ error: error.message })
})

app.post("/auth/signup", signUpController);
app.post("/auth/requestResetPassword", resetPasswordRequestController);
app.post("/auth/resetPassword", resetPasswordController);

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})