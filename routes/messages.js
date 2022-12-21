import express from 'express';
import {Messages} from "../models/messages.js";

const router = express.Router();

router
    // все мессаги
    .get('/', async (req, res) => {
        const messages = await Messages.find();
        res.json(messages);
    })
    .post('/', async (req, res) => {
        try {
            const newMessage = await Messages.create(req.body)
            res.json(newMessage);
        } catch (error) {
            res.status(500); //заглушка
            res.send(error)
        }
    })
    //все мессаги чата
    .get('/:chatId', async (req, res) => {
        const messages = await Messages.find({chatId: req.params.chatId});
        res.json(messages);
    })
    .delete('/:messageId', async (req, res) => {
        const deleted = await Messages.findByIdAndDelete(req.params.messageId)
        res.json(deleted);
    })
    .put('/:messageId', async (req, res) => {
        const updateMessage = await Messages.findByIdAndUpdate(req.params.messageId, req.body)
        res.json(updateMessage);

        res.status(201);
    });

export default router;