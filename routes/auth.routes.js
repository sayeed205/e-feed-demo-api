import { Router } from "express";

import * as authController from "../controllers/auth.controller.js";
import validate from "../middleware/validationHandler.js";
import * as authValidation from "../validations/auth.validation.js";

const router = Router();

// signup route
router.post("/signup", validate(authValidation.signup), authController.signup);

// login route
router.post("/login", (req, res) => res.send("Login Route"));

export default router;
