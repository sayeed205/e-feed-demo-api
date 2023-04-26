// import Joi from "joi";
import { Joi } from "express-validation";
import { Password } from "./custom.validation.js";

const signup = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().custom(Password),
    }),
};

const login = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
};

export { signup, login };
