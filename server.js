import express from 'express';
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import ChatRouter from './routes/chats.js';
import MessageRouter from './routes/messages.js';
import AuthRouter from './routes/auth.js';

import {errorMiddleware} from "./middlewares/error.js";
import {tokenVerify} from "./middlewares/tokenVerify.js";

mongoose.set('strictQuery', true);
mongoose.set('bufferCommands', false);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDb started"))
    .catch((err) => console.log(err));

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (_, res) => {
    res.send('OK');
})
app.get('/profile', tokenVerify, (req, res) => {
    res.send("I'm secured");
});

app.use('/', AuthRouter);
app.use('/chats', ChatRouter);
app.use('/messages', MessageRouter);

app.use(errorMiddleware);

app.all("*", (_, res) => {
    res.status(404).json({error: 404});
});

app.listen(process.env.PORT, () => console.log("Server has been started to http://localhost:5555"));


