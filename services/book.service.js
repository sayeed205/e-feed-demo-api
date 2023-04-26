import Book from "../models/book.model.js";
import ErrRes from "../utils/errorResponse.js";

/**
 * Creates a new book with the given title, description, and author id
 *
 * @param {string} title - The title of the book
 * @param {string} description - The description of the book
 * @param {string} user_id - The id of the author of the book
 * @returns {Promise<object>} The newly created book object
 */
const createBook = async (title, description, user_id) => {
    const bookInfo = { title, description, author: user_id };

    const book = await Book.create(bookInfo);
    return book;
};

/**
 * Retrieves a list of books based on the provided options
 *
 * @param {object} options - The search options for retrieving books
 * @param {string} options.q - The search query
 * @param {string} options.limit - The maximum number of books to retrieve
 * @param {string} options.page - The page number of the retrieved books
 * @returns {Promise<object>} The books and metadata related to the search
 */
const getBooks = async (options) => {
    const limit =
        options.limit && parseInt(options.limit, 10) > 0
            ? parseInt(options.limit, 10)
            : 10;
    const page =
        options.page && parseInt(options.page, 10) > 0
            ? parseInt(options.page, 10)
            : 1;
    const skip = (page - 1) * limit;

    // Set up the query to retrieve books and the total count of books
    const bookQuery = [
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author",
            },
        },
        {
            $unwind: "$author",
        },
        {
            $match: {
                $or: [
                    { title: new RegExp(options.q, "i") },
                    { "author.email": new RegExp(options.q, "i") },
                ],
            },
        },
        {
            $project: {
                title: 1,
                description: 1,
                author: {
                    _id: 1,
                    email: 1,
                },
            },
        },
    ];

    // Retrieve the books, the total count of books, and the count of books matching the query
    const [books] = await Book.aggregate([
        {
            $facet: {
                books: [
                    ...bookQuery,
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit,
                    },
                ],
                totalBooks: [
                    {
                        $count: "totalBooks",
                    },
                ],
                foundBooks: [
                    ...bookQuery,
                    {
                        $count: "foundBooks",
                    },
                ],
            },
        },
        {
            $project: {
                books: 1,
                totalBooks: {
                    $arrayElemAt: ["$totalBooks.totalBooks", 0],
                },
                foundBooks: {
                    $arrayElemAt: ["$foundBooks.foundBooks", 0],
                },
            },
        },
    ]);

    return {
        books: books.books,
        totalBooks: books.totalBooks,
        foundBooks: books.foundBooks,
        query: options.q,
        page: page,
        totalPages: Math.ceil(books.foundBooks / limit),
        limit: limit,
    };
};

/**
 * Returns a book by ID with author email populated.
 * @param {string} id - ID of the book to retrieve.
 * @returns {Promise<object>} - Promise object representing the book object.
 */
const getBook = async (id) => {
    const book = await Book.findOne({ _id: id }).populate("author", "email");
    return book;
};

/**
 * Updates a book by ID if the user is the owner.
 * @param {string} id - ID of the book to update.
 * @param {string} user_id - ID of the user making the update.
 * @param {object} bookInfo - Object containing the updated book information.
 * @returns {Promise<object>} - Promise object representing the updated book object.
 * @throws {ErrRes} - Throws an error if the user is not the owner of the book.
 */
const updateBook = async (id, user_id, bookInfo) => {
    // Check if user is the owner of the book
    const isOwner = await Book.isOwner(id, user_id);
    if (!isOwner) throw new ErrRes("You are not the owner of this book", 403);

    // Update the book and return the updated object
    const updatedBook = await Book.findOneAndUpdate({ _id: id }, bookInfo, {
        new: true,
        runValidators: true,
    });

    return updatedBook;
};

/**
 * Deletes a book by ID if the user is the owner.
 * @param {string} id - ID of the book to delete.
 * @param {string} user_id - ID of the user making the delete request.
 * @returns {Promise<object>} - Promise object representing the result of the delete operation.
 * @throws {ErrRes} - Throws an error if the user is not the owner of the book.
 */
const deleteBook = async (id, user_id) => {
    // Check if user is the owner of the book
    const isOwner = await Book.isOwner(id, user_id);
    if (!isOwner) throw new ErrRes("You are not the owner of this book", 403);

    // Delete the book and return the result object
    const data = await Book.deleteOne({ _id: id });
    return data;
};

export { createBook, getBooks, getBook, updateBook, deleteBook };
