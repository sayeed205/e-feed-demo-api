// Importing necessary modules and files
import asyncHandler from "../middleware/asyncHandler.js";
import * as bookServices from "../services/book.service.js";

/**
 * Async function to create a new book.
 * Uses asyncHandler middleware to handle any errors that may occur.
 * Calls the bookServices.createBook function with the request body data and user ID from the request object.
 * Sends a 201 status response and the returned data as JSON.
 */
const createBook = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const data = await bookServices.createBook(
        title,
        description,
        req.user.user_id
    );
    return res.status(201).json({ ok: true, data });
});

/**
 * Async function to retrieve a list of books.
 * Uses asyncHandler middleware to handle any errors that may occur.
 * Calls the bookServices.getBooks function with the query parameters from the request object.
 * Sends a 200 status response and the returned data as JSON.
 */
const getBooks = asyncHandler(async (req, res) => {
    const data = await bookServices.getBooks(req.query);
    return res.status(200).json({ ok: true, data });
});

/**
 * Async function to retrieve a single book by ID.
 * Uses asyncHandler middleware to handle any errors that may occur.
 * Calls the bookServices.getBook function with the book ID from the request object.
 * Sends a 200 status response and the returned data as JSON.
 */
const getBook = asyncHandler(async (req, res) => {
    const data = await bookServices.getBook(req.params.id);
    return res.status(200).json({ ok: true, data });
});

/**
 * Async function to update a book.
 * Uses asyncHandler middleware to handle any errors that may occur.
 * Calls the bookServices.updateBook function with the book ID, user ID from the request object, and request body data.
 * Sends a 200 status response and the returned data as JSON.
 */
const updateBook = asyncHandler(async (req, res) => {
    const { user_id } = req.user;
    const book_id = req.params.id;

    const data = await bookServices.updateBook(book_id, user_id, req.body);
    return res.status(200).json({ ok: true, data });
});

/**
 * Async function to delete a book.
 * Uses asyncHandler middleware to handle any errors that may occur.
 * Calls the bookServices.deleteBook function with the book ID and user ID from the request object.
 * Sends a 200 status response and the returned data as JSON.
 */
const deleteBook = asyncHandler(async (req, res) => {
    const { user_id } = req.user;
    const book_id = req.params.id;

    const data = await bookServices.deleteBook(book_id, user_id);
    return res.status(200).json({ ok: true, data });
});

// Exporting the createBook, getBooks, getBook, updateBook, and deleteBook functions as named exports
export { createBook, getBooks, getBook, updateBook, deleteBook };
