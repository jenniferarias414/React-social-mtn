// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
// require('dotenv').config();
import {config} from 'dotenv';
config();
import {User} from '../models/user.js';
import bcrypt from 'bcrypt';


const SECRET = process.env.SECRET

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ where: { username: username } }); 

    if (foundUser) {
      const isAuthenticated = bcrypt.compareSync(
        password,
        foundUser.hashedPass
      );
      if (isAuthenticated) {
        const token = createToken(
          foundUser.dataValues.username,
          foundUser.dataValues.id
        );
        // Set expiration time for token (two days)
        const exp = Date.now() + 1000 * 60 * 60 * 48;

        res.status(200).send({
          username: foundUser.dataValues.username,
          userId: foundUser.dataValues.id,
          token: token,
          exp: exp,
        });
      } else {
        return res.status(400).send("Password is incorrect.");
      }
    } else {
      return res.status(400).send("User does not exist.");
    }
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
}

export const register = async (req, res) => {
    try {
        const {username, password} = req.body;
        const foundUser = await User.findOne({ where: { username: username } });

        if (foundUser) {
            return res.status(400).send('user with this username already exists')
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = await User.create({username: username, hashedPass: hash});

            const token = createToken(newUser.dataValues.username, newUser.dataValues.id);
            // Set expiration time for token (two days)
            const exp = Date.now() + 1000 * 60 * 60 * 48;

            res.status(200).send({
                username: newUser.dataValues.username,
                userId: newUser.dataValues.id,
                token: token,
                exp: exp
            });
        }
    } catch (err) {
        console.error(err)
        res.status(400).send(err)
    }
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