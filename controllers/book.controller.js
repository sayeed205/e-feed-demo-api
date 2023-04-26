import asyncHandler from "../middleware/asyncHandler.js";
import * as bookServices from "../services/book.service.js";

const createBook = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const data = await bookServices.createBook(
        title,
        description,
        req.user.user_id
    );
    res.status(201).json({ ok: true, data });
});

const getBooks = asyncHandler(async (req, res) => {
    const data = await bookServices.getBooks();
    res.status(200).json({ ok: true, data });
});

const getBook = asyncHandler(async (req, res) => {
    const data = await bookServices.getBook(req.params.id);
    res.status(200).json({ ok: true, data });
});

const updateBook = asyncHandler(async (req, res) => {
    const { user_id } = req.user;
    const book_id = req.params.id;

    const data = await bookServices.updateBook(book_id, user_id, req.body);
    res.status(200).json({ ok: true, data });
});

const deleteBook = asyncHandler(async (req, res) => {
    const { user_id } = req.user;
    const book_id = req.params.id;

    const data = await bookServices.deleteBook(book_id, user_id);
    res.status(200).json({ ok: true, data });
});

export { createBook, getBooks, getBook, updateBook, deleteBook };
