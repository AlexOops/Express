import express from 'express';
import mongoose from "mongoose";

import ChatRouter from './routes/chats.js';
import MessageRouter from './routes/messages.js';
import UsersRouter from './routes/users.js';

import {errorMiddleware} from "./middlewares/error.js";

mongoose.set('strictQuery', true);
mongoose.set('bufferCommands', false);

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log("MongoDb started"))
    .catch((err) => console.log(err));

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (_, res) => {
    res.send('OK');
})

app.use('/chats', ChatRouter);
app.use('/messages', MessageRouter);
app.use('/users', UsersRouter);

app.use(errorMiddleware);

app.listen(5555, () => console.log("Server has been started to https://localhost:5555"));


