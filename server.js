import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";

import ChatRouter from './routes/chats.js';
import MessageRouter from './routes/messages.js';

mongoose.set('strictQuery', true);
mongoose.set('bufferCommands', false);

mongoose.connect('mongodb://localhost:27017/test').then(() =>
    console.log("MongoDb started")).catch((err) => console.log(err));

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/status', (req, res) => {
    res.send('OK');
})

app.use('/chats', ChatRouter);
app.use('/messages', MessageRouter);

app.listen(5555, () => console.log("Server has been started to https://localhost:5555"));


