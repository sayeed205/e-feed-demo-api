import mongoose from "mongoose";
import ErrRes from "../utils/errorResponse.js";
import toJSON from "./plugins/toJSON.plugin.js";

// Define the book schema
const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Attach the toJSON plugin to the schema
bookSchema.plugin(toJSON);

// Define a static method to check if the current user is the owner of the book
bookSchema.statics.isOwner = async function (book_id, user_id) {
    const book = await this.findOne({ _id: book_id });
    if (!book) throw new ErrRes("Book not found", 404);
    return book.author.equals(user_id);
};

// Create the Book model using the book schema
const Book = mongoose.model("Book", bookSchema);

export default Book;
