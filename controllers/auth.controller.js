// Importing necessary modules and files
import asyncHandler from "../middleware/asyncHandler.js";
import * as authServices from "../services/auth.service.js";

/**
 * Async function to sign up a new user.
 * Uses asyncHandler middleware to handle any errors that may occur.
 * Calls the authServices.signup function with the request body data.
 * Sends a 201 status response and the returned data as JSON.
 */
const signup = asyncHandler(async (req, res) => {
    const data = await authServices.signup(req.body);
    res.status(201).json({ ok: true, data });
});

/**
 * Async function to log in a user.
 * Uses asyncHandler middleware to handle any errors that may occur.
 * Calls the authServices.login function with the request body data.
 * Sends a 200 status response and the returned data as JSON.
 */
const login = asyncHandler(async (req, res) => {
    const data = await authServices.login(req.body);
    res.status(200).json({ ok: true, data });
});

// Exporting the signup and login functions as named exports
export { signup, login };
