import { Joi } from "express-validation";
import { mongoId } from "./custom.validation.js";

// Joi validation schema for creating a new book
const createBook = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
    }),
};

// Joi validation schema for getting a list of books
const getBooks = {
    query: Joi.object().keys({
        page: Joi.number().integer().min(1).allow(""),
        limit: Joi.number().integer().min(1).allow(""),
        q: Joi.string().allow(""),
    }),
};

// Joi validation schema for getting a single book by its ID
const getBook = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(mongoId),
    }),
};

// Joi validation schema for updating a book by its ID
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

// Joi validation schema for deleting a book by its ID
const deleteBook = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(mongoId),
    }),
};

export { createBook, getBooks, getBook, updateBook, deleteBook };
