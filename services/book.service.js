import Book from "../models/book.model.js";
import ErrRes from "../utils/errorResponse.js";

const createBook = async (title, description, user_id) => {
    const bookInfo = { title, description, author: user_id };

    const book = await Book.create(bookInfo);
    return book;
};

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

    console.log(limit, page, skip);

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
