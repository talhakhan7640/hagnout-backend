import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from "cors";

// getting routes
import userRouter from './routes/users/userRoutes.js';
import roomRouter from './routes/rooms/roomRoute.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// use routes
app.use('/user', userRouter);
app.use('/room', roomRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})


try { 
    mongoose.connect(process.env.URI)
    .then(() => {
        app.listen(5000, () => {
            console.log(`server started`)
        })
    }).catch((error) => {
        console.log("server could not be started")
    })
} catch (error) {
    console.log(error);
}

// dev-akh0lkiqzxbgygks