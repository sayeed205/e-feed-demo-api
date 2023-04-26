import Book from "../models/book.model.js";
import ErrRes from "../utils/errorResponse.js";

const createBook = async (title, description, user_id) => {
    const bookInfo = { title, description, author: user_id };

    const book = await Book.create(bookInfo);
    return book;
};

const getBooks = async () => {
    const books = await Book.find().populate("author", "email");

    return books;
};

const getBook = async (id) => {
    const book = await Book.findOne({ _id: id }).populate("author", "email");

    return book;
};

const updateBook = async (id, user_id, bookInfo) => {
    const isOwner = await Book.isOwner(id, user_id);
    if (!isOwner) throw new ErrRes("You are not the owner of this book", 403);

    const updatedBook = await Book.findOneAndUpdate({ _id: id }, bookInfo, {
        new: true,
        runValidators: true,
    });

    return updatedBook;
};

const deleteBook = async (id, user_id) => {
    const isOwner = await Book.isOwner(id, user_id);
    if (!isOwner) throw new ErrRes("You are not the owner of this book", 403);

    const data = await Book.deleteOne({ _id: id });

    return data;
};

export { createBook, getBooks, getBook, updateBook, deleteBook };
