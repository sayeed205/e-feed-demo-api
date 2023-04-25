import asyncHandler from "../middleware/asyncHandler.js";
import * as authServices from "../services/auth.service.js";

const signup = asyncHandler(async (req, res, next) => {
    const data = await authServices.signup(req.body);
    res.status(201).json({ data, ok: true });
});

export { signup };
