// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
// require('dotenv').config();
import {config} from 'dotenv';
config();
import {User} from '../models/user.js';
import bcrypt from 'bcryptjs';

const SECRET = process.env.SECRET

export const login = async (req, res) => {
     const { username, password } = req.body;
     const token = createToken(username, password);

    console.log('login')
    res.status(200).send(token)
}

export const register = async (req, res) => {
    console.log('register')
    res.sendStatus(200)
}

const createToken = (username, id) => {
    return jwt.sign({username, id}, SECRET, {expiresIn: '2 days'})
}

// module.exports = {
//     login: async (req, res) => {
//         console.log('login')
//         res.sendStatus(200)
//     },
//     register: async (req, res) => {
//         console.log('register')
//         res.sendStatus(200)
//     },
//  use with create-react-app}