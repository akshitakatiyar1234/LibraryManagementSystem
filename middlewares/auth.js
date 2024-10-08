import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const jwtAuth = (req, res, next) => {
    // Get the token from the headers
    const authHeader = req.headers['authorization'];

    // If no authorization header is found
    if (!authHeader) {
        return res.status(401).json({ success: false, message: "Unauthorized access, token missing" });
    }

    // Check if the authHeader includes 'Bearer'
    let token;
    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]; // Extract token after 'Bearer '
    } else {
        token = authHeader; // Treat the entire authHeader as the token
    }
   
    //If token donot exists
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized access, invalid token format" });
    }

    try {
        // Verify the token using the secret key
        const payload = jwt.verify(token, process.env.SECRET_KEY);

        // Optionally,attached the decoded payload to the request object for future use
        req.user = payload;
        
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error('JWT Verification Error:', err);
        return res.status(403).json({ success: false, message: "Invalid token" });
    }
};

export default jwtAuth;

