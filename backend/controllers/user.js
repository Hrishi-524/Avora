import 'dotenv/config'
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import Listing from '../models/Listing.js';
import Booking from '../models/Booking.js';

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

export const fetchUserDetails = async (req, res) => {
    try {
        const { id } = req.params
        const userDetails = await User.findById(id);
        console.log(userDetails)
        res.status(201).json({
            userDetails,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message : 'failed to fetch user! Internal server error 500'
        })
    }
}

export const fetchUserBookings = async (req, res) => {
    try {
        const { id } = req.params
        const userBookings = await Booking.find({ user: id }).populate("listing").populate("user");
        console.log(userBookings)
        res.status(201).json({
            success : true,
            userBookings,
        })
    } catch (error) {
        console.error("Error in fetcing user bookings", error);
        const message = error?.error?.description || "Failed to fetch bookings";

        res.status(500).json({
            success: false,
            message: message,
        })
    }
}  

export const fetchHostListings = async (req, res) => {
    try {
        const { id } = req.params;
        
        const hostListings = await Listing.find({ host: id })
            .populate({
                path: "host",
                select: "username profileImage hostRating"
            })
            .populate("reviews");  // Simple populate without nested user

        res.status(200).json({
            success: true,
            count: hostListings.length,
            hostListings,
        });
    } catch (error) {
        console.error("Error in fetching host listings", error);
        
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch host listings",
        });
    }
};