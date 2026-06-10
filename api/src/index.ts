import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoutes from "./packages/user/route.js"
import taskRoutes from "./packages/task/route.js"
import cors from "cors"
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT;
mongoose.connect(process.env.DB_URL!).then(() => {
    app.listen(PORT, () => {
        console.log("Database connected at ", PORT)
    })
}).catch((err: any) => {
    console.log("Database Disconnected", err)
})

