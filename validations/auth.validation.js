import { Joi } from "express-validation";
import { Password } from "./custom.validation.js";

// Validation schema for user signup request
const signup = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().custom(Password),
    }),
};

// Validation schema for user login request
const login = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

export { signup, login };
