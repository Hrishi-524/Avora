import jwt from 'jsonwebtoken';
import multer from "multer";
import { storage } from './cloudConfig.js';

export const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log(`MIDDLEWARE/ISLOGGEDIN/FAIL`)
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request object
    
    console.log(`MIDDLEWARE/ISLOGGEDIN/SUCCESS`)
    next();
}

export const upload = multer({ storage });