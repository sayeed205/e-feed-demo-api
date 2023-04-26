import mongoose from "mongoose";
import toJSON from "./plugins/toJSON.plugin.js";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

bookSchema.plugin(toJSON);

bookSchema.statics.isOwner = async function (book_id, user_id) {
    const book = await this.findOne({ _id: book_id });
    return book.author.equals(user_id);
};

const Book = mongoose.model("Book", bookSchema);

export default Book;
