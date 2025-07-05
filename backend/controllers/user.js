import 'dotenv/config'
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import Listing from '../models/Listing.js';

export const signupUser = async (req, res) => {
    try {
        const {username, email, password, isHost} = req.body;

        //hash password
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        //save user to database
        const newUser = new User({
            username : username,
            email : email,
            password : hash,
            isHost : isHost,
        })

        await newUser.save();

        //return jwt token
        const token = jwt.sign({
            id : newUser._id,
            username : newUser.username,
        }, process.env.JWT_SECRET, {
            expiresIn : '7h',
        });  

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error : error.message });
    }
}

export const verifyLogin = async (req, res) => {
    try {
        const {username, password} = req.body;
        
        const user = await User.findOne({ username })

        if(!user) {
            return res.status(401).json({ error : "Invalid username or password"});
        }

        const isVerified = await bcrypt.compare(password, user.password);
        if(isVerified) {

            const token = jwt.sign({
                id : user._id,
                username : user.username,
            }, process.env.JWT_SECRET, {
                expiresIn : '7h',
            });

            res.status(200).json({ token });
        } else {
            res.status(401).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}