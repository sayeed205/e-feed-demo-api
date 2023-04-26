import { Router } from "express";
import { validate } from "express-validation";

import * as authController from "../controllers/auth.controller.js";
import * as authValidation from "../validations/auth.validation.js";

const router = Router();

// signup route
router.post("/signup", validate(authValidation.signup), authController.signup);

// login route
router.post("/login", validate(authValidation.login), authController.login);

export default router;
