import { Joi } from "express-validation";
import { mongoId } from "./custom.validation.js";

const createBook = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
    }),
};

const getBooks = {
    query: Joi.object().keys({
        page: Joi.number().integer().min(1).allow(""),
        limit: Joi.number().integer().min(1).allow(""),
        q: Joi.string().allow(""),
    }),
};

const getBook = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(mongoId),
    }),
};

const updateBook = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(mongoId),
    }),
    body: Joi.object()
        .keys({
            title: Joi.string(),
            description: Joi.string(),
        })
        .min(1),
};

const deleteBook = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(mongoId),
    }),
};

export { createBook, getBooks, getBook, updateBook, deleteBook };
