import Joi from "joi";
import ErrRes from "../utils/errorResponse.js";
import makeSchema from "../utils/makeSchema.js";

const validate = (schema) => (req, res, next) => {
    const validSchema = makeSchema(schema, ["body", "query", "params"]);
    const object = makeSchema(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: "key" } })
        .validate(object);

    if (error) {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");

        return next(new ErrRes(message, 400));
    }

    Object.assign(req, value);
    return next();
};

export default validate;
