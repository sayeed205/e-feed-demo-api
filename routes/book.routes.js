// Importing necessary modules and files
import { Router } from "express";
import { validate } from "express-validation";
import * as bookController from "../controllers/book.controller.js";
import auth from "../middleware/apiAuth.js";
import * as bookValidation from "../validations/book.validation.js";

// Creating a new router instance
const router = Router();

/**
 * Route to get all books.
 * Validates the request data before calling the bookController.getBooks function.
 */
router.get("/", validate(bookValidation.getBooks), bookController.getBooks);

/**
 * Route to get a single book by ID.
 * Validates the request data before calling the bookController.getBook function.
 */
router.get("/:id", validate(bookValidation.getBook), bookController.getBook);

/**
 * Route to create a new book.
 * Authenticates the user using the auth middleware,
 * validates the request data before calling the bookController.createBook function.
 */
router.post(
    "/",
    auth,
    validate(bookValidation.createBook),
    bookController.createBook
);

/**
 * Route to update an existing book by ID.
 * Authenticates the user using the auth middleware,
 * validates the request data before calling the bookController.updateBook function.
 */
router.put(
    "/:id",
    auth,
    validate(bookValidation.updateBook),
    bookController.updateBook
);

/**
 * Route to delete an existing book by ID.
 * Authenticates the user using the auth middleware,
 * validates the request data before calling the bookController.deleteBook function.
 */
router.delete(
    "/:id",
    auth,
    validate(bookValidation.deleteBook),
    bookController.deleteBook
);

// Exporting the router instance as a default export
export default router;
