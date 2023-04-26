import jwt from "jsonwebtoken";
import ErrRes from "../utils/errorResponse.js";

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        throw new ErrRes(`unauthorized, please provide a valid jwt token`, 401);
    }

    jwt.verify(token, process.env.JWT_SECRET, verifyCallback(req, res, next));
};

const verifyCallback = (req, res, next) => (err, user) => {
    if (err) {
        throw new ErrRes(
            `token expired or invalid token, please try again with valid jwt token`,
            403
        );
    }
    req.user = user;
    next();
};

export default auth;
