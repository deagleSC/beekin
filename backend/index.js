import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"

import authRoutes from "./routes/auth.js"
import jobRoutes from "./routes/job.js"
import userRoutes from "./routes/user.js"

const app = express();
dotenv.config();

app.use(cors())
app.use(express.json());

app.use('/auth', authRoutes)
app.use('/jobs', jobRoutes)
app.use('/user', userRoutes)

const PORT = process.env.PORT || 8000;

app.get(`/api/test`, (req, res) => {
    try {
        res.status(200).json({message: `Listening to port ${PORT}`})
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
})

const connect = (next) => {
    mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Mongodb connected");
        next()
    })
    .catch((err) => {
        throw err;
    });
};

connect(() => {
    app.listen(PORT, () => {
        console.log("Listening to port 8000");
    });
})