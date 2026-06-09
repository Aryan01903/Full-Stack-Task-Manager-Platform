import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5050;
mongoose.connect(process.env.DB_URL!).then(() => {
    app.listen(PORT, () => {
        console.log("Database connected at ", PORT)
    })
}).catch((err: any) => {
    console.log("Database Disconnected", err)
})

