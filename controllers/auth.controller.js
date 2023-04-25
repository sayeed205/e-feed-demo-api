import asyncHandler from "../middleware/asyncHandler.js";
import * as authServices from "../services/auth.service.js";

const signup = asyncHandler(async (req, res) => {
    const data = await authServices.signup(req.body);
    res.status(201).json({ data, ok: true });
});

const login = asyncHandler(async (req, res) => {
    const data = await authServices.login(req.body);
    res.status(200).json({ data, ok: true });
});

export { signup, login };
