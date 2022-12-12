import express from 'express';
import {Users} from "../models/users.js";

const router = express.Router();

router
    .get('/:userId', async (req, res) => {
        const user = await Users.find({id: req.params.userId});
        res.json(user);
    })
    .post('/', async (req, res) => {
        try {
            const newUser = await Users.create(req.body)
            res.json(newUser);
        } catch (error) {
            res.status(500); //заглушка
            res.send(error)
        }
    })
    .delete('/:userId', async (req, res) => {
        const deletedUser = await Users.findByIdAndDelete(req.params.userId)
        res.json(deletedUser);
    })
    .put('/:userId', async (req, res) => {
        const updateUser = await Users.findByIdAndUpdate(req.params.userId, req.body)
        res.json(updateUser);
        res.status(201);
    });

export default router;