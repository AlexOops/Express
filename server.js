import express from 'express';
import bodyParser from "body-parser";

import ChatRouter from './routes/chats.js';
import MessageRouter from './routes/messages.js';

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/status', (req, res) => {
    res.send('OK');
})

app.use('/chats', ChatRouter);
app.use('/messages', MessageRouter);

app.listen(3000, () => console.log("Server has been started to https://localhost:3000"));


