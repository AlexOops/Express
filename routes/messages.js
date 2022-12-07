import express from 'express';
import {Messages} from "../models/messages.js";

const router = express.Router();

let messages = {};

router
    .get('/', async (req, res) => {
        const messages = await Messages.find();
        res.json(messages);
    })
    .post('/', async (req, res) => {
        try {
            const newMessage = await Messages.create({
                chatId: "1",
                author: "user",
                // text: "some text"
            })
            res.json(newMessage);
        } catch (error) {
            res.status(500); //заглушка
            res.send(error)
        }

    })
    .get('/:chatId', (req, res) => {
        //провечерка на undef
        res.send(messages[req.params.chatId])
    })
    .post('/:chatId', (req, res) => {
        let newMessages = req.body
        messages[req.params.chatId].push(newMessages);
        res.status(201);
        res.send('ok');
    })
    .delete('/:chatId/:messageId', (req, res) => {
        console.log(req.params.messageId);
        messages[req.params.chatId] = messages[req.params.chatId].filter(
            (message) => message.id !== req.params.messageId);

        res.send('ok');
    })
    .put('/:chatId/:messageId', (req, res) => {
        messages[req.params.chatId] = messages[req.params.chatId].map(message => {
            if (message.id === req.params.messageId) {
                return req.body
            } else {
                return message
            }
        });

        res.status(201);
        res.send('ok');
    });

export default router;