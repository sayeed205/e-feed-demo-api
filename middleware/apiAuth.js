import jwt from "jsonwebtoken";
import ErrRes from "../utils/errorResponse.js";

/**
 * Middleware function to verify user authentication token
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 */
const auth = (req, res, next) => {
    // Get authorization header and token
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if token is missing or null
    if (token == null) {
        throw new ErrRes(`unauthorized, please provide a valid jwt token`, 401);
    }

    // Verify token and execute callback function
    jwt.verify(token, process.env.JWT_SECRET, verifyCallback(req, res, next));
};

/**
 * Callback function to execute after verifying the token
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @returns {function} - Callback function to execute after verifying the token
 */
const verifyCallback = (req, res, next) => (err, user) => {
    // Check if there is an error verifying the token
    if (err) {
        throw new ErrRes(
            `token expired or invalid token, please try again with valid jwt token`,
            403
        );
    }

    // Set user property in the request object and execute the next middleware function
    req.user = user;
    next();
};

export default auth;
