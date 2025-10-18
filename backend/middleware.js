import jwt from 'jsonwebtoken';
import multer from "multer";
import { storage } from './cloudConfig.js';

export const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log(`MIDDLEWARE/ISLOGGEDIN/FAIL`)
        return res.status(401).json({ error: "Access denied. No token provided." });
    }
    
    // const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const token = authHeader.split(' ')[1]; // safer than substring

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        console.log('MIDDLEWARE/ISLOGGEDIN/SUCCESS');
        next();
    } catch (err) {
        console.log('MIDDLEWARE/ISLOGGEDIN/FAIL: Invalid token', err.message);
        return res.status(401).json({ error: 'Access denied. Invalid token.' });
    }
    next();
}

export const upload = multer({ storage });