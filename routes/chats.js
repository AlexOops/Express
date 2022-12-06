import express from 'express';

const router = express.Router();

let chats = [];

router
    .get('/', (req, res) => {
        res.send(chats)
    })
    .post('/', (req, res) => {
        chats.push(req.body);
        res.status(201);
        res.send('ok');
    })
    .delete('/:id', (req, res) => {
        console.log(req.params.id);
        chats = chats.filter((chat) => chat.id !== req.params.id);

        res.send('ok');
    })
    .put('/:id', (req, res) => {
        console.log(req.params.id)
        console.log(req.body.name)

        chats = chats.map(chat => {
            if (chat.id === req.params.id) {
                return {
                    id: chat.id,
                    name: req.body.name
                }
            } else {
                return chat
            }
        });

        res.status(201);
        res.send('ok');
    });

export default router;