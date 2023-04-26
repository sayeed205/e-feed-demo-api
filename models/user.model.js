import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/**
 * Load environment variables from .env file
 */
if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: ".env.local" });
} else {
    dotenv.config({ path: ".env" });
}

/**
 * @typedef {Object} UserDocument
 * @property {string} email - User's email address
 * @property {string} password - User's password (hashed)
 * @property {function} isPasswordMatch - Check if the given password matches the user's password
 * @property {function} getJwtToken - Generate and return a JSON Web Token (JWT) for the user
 */

/**
 * Mongoose schema for User model
 * @type {import("mongoose").Schema<UserDocument>}
 */
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Middleware function to hash the user's password before saving to database
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
});

/**
 * Static method to check if the email is already taken
 * @param {string} email - The email to check
 * @returns {Promise<boolean>} - A promise that resolves to true if the email is taken, false otherwise
 */
userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

/**
 * Method to check if the given password matches the user's password
 * @param {string} password - The password to check
 * @returns {Promise<boolean>} - A promise that resolves to true if the password matches, false otherwise
 */
userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
};

/**
 * Method to generate and return a JSON Web Token (JWT) for the user
 * @returns {string} - The JWT token
 */
userSchema.methods.getJwtToken = function () {
    return jwt.sign(
        {
            user_id: this._id,
            email: this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

/**
 * Mongoose model for User
 * @type {import("mongoose").Model<UserDocument>}
 */
const User = mongoose.model("User", userSchema);

export default User;
