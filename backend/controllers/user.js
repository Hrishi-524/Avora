import 'dotenv/config'
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import Listing from '../models/Listing.js';

export const signupUser = async (req, res) => {
    //sign up user who submitted form with (username, email, passowrd)
    try {
        const {username, email, password} = req.body;

        //hash password
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        //save user to database
        const newUser = new User({
            username : username,
            email : email,
            password : hash,
            isHost : false,
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
    //sign in user who submitted username and password , verify credentials
    try {
        const {username, password} = req.body;
        
        //find if this unique username exists
        const user = await User.findOne({ username })

        if(!user) {
            return res.status(401).json({ error : "Invalid username or password"});
        }

        //to check passowrd match : verify using JWT use compare function to compare passowrds
        const isVerified = await bcrypt.compare(password, user.password);
        //if credentials are correct create access token 
        if(isVerified) {
            const token = jwt.sign({
                id : user._id,
                username : user.username,
            }, process.env.JWT_SECRET, {
                expiresIn : '7h',
            });

            //return token so that we can store in frontend localstorage
            res.status(200).json({ token });
        } else {
        //credentials are not correct return error
            res.status(401).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}