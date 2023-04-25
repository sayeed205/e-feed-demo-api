import Joi from "joi";
import { Password } from "./custom.validation.js";

const signup = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().custom(Password),
    }),
};

export { signup };
