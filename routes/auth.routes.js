// Importing necessary modules and files
import { Router } from "express";
import { validate } from "express-validation";
import * as authController from "../controllers/auth.controller.js";
import * as authValidation from "../validations/auth.validation.js";

// Creating a new router instance
const router = Router();

/**
 * Route to sign up a new user.
 * Validates the request data before calling the authController.signup function.
 */
router.post("/signup", validate(authValidation.signup), authController.signup);

/**
 * Route to log in a user.
 * Validates the request data before calling the authController.login function.
 */
router.post("/login", validate(authValidation.login), authController.login);

// Exporting the router instance as a default export
export default router;
