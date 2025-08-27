import 'dotenv/config'
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import Listing from '../models/Listing.js';
import Booking from '../models/Booking.js';
import ExpressError from '../errorhandling/ExpressError.js';

export const signupUser = async (req, res) => {
    const {username, email, password} = req.body;

    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        username : username,
        email : email,
        password : hash,
        isHost : false,
    })

    await newUser.save();

    const token = jwt.sign({
        id : newUser._id,
        username : newUser.username,
    }, process.env.JWT_SECRET, {
        expiresIn : '7h',
    });  

    console.log(`POST/SIGN UP USER: ${newUser._id}, ${newUser.username}`)

    res.status(201).json({ token });
}

export const verifyLogin = async (req, res) => {
    const {username, password} = req.body;
    
    const user = await User.findOne({ username })

    if (!user) {
        return next(new ExpressError("Invalid Username Or Password", 401));
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
}

export const fetchUserDetails = async (req, res) => {
    const { id } = req.params
    const userDetails = await User.findById(id);
    console.log(`GET/FETCH USER DETAILS: ${id}`)
    res.status(201).json({
        userDetails,
    })
}

export const fetchUserBookings = async (req, res) => {
    const { id } = req.params
    const userBookings = await Booking.find({ user: id }).populate("listing").populate("user");
    console.log(`GET/FETCH USER BOOKINGS: ${id}`)
    res.status(201).json({
        success : true,
        userBookings,
    })
}  

export const fetchHostListings = async (req, res) => {
    const { id } = req.params;
    
    const hostListings = await Listing.find({ host: id })
        .populate({
            path: "host",
            select: "username profileImage hostRating"
        })
        .populate("reviews"); 
    
    console.log(`GET/FETCH HOST LISTINGS: ${id}`)
    res.status(200).json({
        success: true,
        count: hostListings.length,
        hostListings,
    });
};