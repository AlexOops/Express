import express from 'express';

const app = express();
import http from 'http';

const server = http.createServer(app);
import {Server} from 'socket.io';
import path from "path";

import cors from 'cors';
app.use(cors());

const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'));
});

const userMap = {}

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    userMap[socket.id] = {
        id: socket.id
    }

    console.log(userMap)

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete userMap[socket.id]
    });

    socket.on('client-msg', (data) => {
        console.log(data);

        const payload = {
            message: data.message.split('').join('')
        }
        socket.broadcast.emit('client-msg', payload); // на всех
        socket.emit('client-msg', payload); // на себя

    })
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});

