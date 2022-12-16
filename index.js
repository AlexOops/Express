import express from 'express';

const app = express();
import http from 'http';

const server = http.createServer(app);

import {Server} from 'socket.io';
import path from "path";

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('client-msg', (data) => {
        console.log(data)
    })
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});

