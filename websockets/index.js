import express from 'express';

const app = express();
import http from 'http';

const server = http.createServer(app);
import {Server} from 'socket.io';
import path from "path";
import cors from 'cors';

// random name
import {generateSlug} from "random-word-slugs";

app.use(cors());

const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'));
});

const userMap = {};

io.on('connection', (client) => {
    console.log('user connected', client.id);

    userMap[client.id] = {
        id: client.id,
        name: generateSlug()
    }

    const info = {
        connect: `Подключился пользователь ${userMap[client.id].name}`,
        userCounter: io.engine.clientsCount
    }

    console.log(info.userCounter)

    client.broadcast.emit('connection', info);
    client.emit('connection', info);


    client.on('disconnect', () => {
        console.log('user disconnected', client.id);

        const info = {
            loggedOut: `Отключился пользователь ${userMap[client.id].name}`
        }

        client.broadcast.emit('room-out', info);
        client.emit('room-out', info);

        delete userMap[client.id]
    });

    client.on('client-msg', (data) => {
        console.log(data);

        const payload = {
            message: data.message.split('').join(''),
            author: userMap[client.id].name
        }
        client.broadcast.emit('client-msg', payload); // на всех
        client.emit('client-msg', payload); // на себя

    })
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});

