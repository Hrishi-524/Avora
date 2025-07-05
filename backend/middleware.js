import jwt from 'jsonwebtoken';

export const isLoggedIn = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        console.log("Middleware ---")
        console.log(authHeader)
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }
        
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user info to request object
        
        console.log("User authenticated:", decoded);
        next();
    } catch (error) {
        console.log("Token verification failed:", error.message);
        res.status(401).json({ error: "Invalid token" });
    }
}
