import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from "cors";
import express from 'express'
import dotenv from "dotenv";
import { app, server, io } from "./server.js";

dotenv.config();

// getting routes
import userRouter from './routes/users/userRoutes.js';
import roomRouter from './routes/rooms/roomRoute.js';
import messageRouter from "./routes/messages/messages.js";

// settings cors options 
const corsOptions = {
    origin: '*', // allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type'],
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
 app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type ,Accept");
     next();
 })

// settings up middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// use routes
app.use('/users', userRouter);
app.use('/rooms', roomRouter);
app.use('/messages', messageRouter);

try { 
    mongoose.connect(process.env.URI)
    .then(() => {
        server.listen(5000, () => {
            console.log(`server started`)
        })
    }).catch((error) => {
        console.log("server could not be started")
    })
} catch (error) {
    console.log(error);
}

// dev-akh0lkiqzxbgygks
