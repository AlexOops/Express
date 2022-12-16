import express from "express";
import {Users} from "../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {Tokens} from "../models/tokens.js";

const router = express.Router();

router
    .post('/signup', async (req, res, next) => {
        await Users.create(req.body, (error, newUser) => {
            if (error) {
                next(error);
                return;
            }
            const {_id, name, email} = newUser;
            res.status(201).send({_id, name, email});
        });
    })
    .post('/signin', async (req, res) => {

        const email = req.body.email;
        const password = req.body.password;

        const user = await Users.findOne({email});

        if (!user) {
            res.status(400).json({message: "login or password is wrong!"});
            return;
        }

        const compare = await bcrypt.compare(password, user.password);

        if (!compare) {
            res.status(400).json({message: "login or password is wrong!"});
            return;
        }

        const data = {
            id: user._id,
            name: user.name,
            email: user.email
        }
        // не забыть подсолить
        const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1m"});
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d"});

        await Tokens.findOne({email: user.email}).update({expiresIn: false});

        await Tokens.create({token: refreshToken, email: user.email}, (error) => {
            if (error) {
                res.status(500).json({error: true, message: "refresh token not be created"});
            } else {
                res.status(200).json({accessToken, refreshToken});
            }
        });
    })
    .post('/token', async (req, res) => {
        const refreshToken = req.body.refreshToken;

        if (refreshToken) {
            const decodeToken = jwt.decode(refreshToken);
            const updatedToken = await Tokens.findOne({token: refreshToken, expiresIn: true});

            if (updatedToken) {
                const newAccessToken = jwt.sign(
                    {
                        id: decodeToken.id, ///??????
                        email: decodeToken.email
                    },
                    process.env.ACCESS_TOKEN_SECRET
                );
                res.status(200).json({newAccessToken});
            } else {
                res
                    .status(401)
                    .json({error: true, message: "Access denied!"});
            }
        }
    });

export default router;