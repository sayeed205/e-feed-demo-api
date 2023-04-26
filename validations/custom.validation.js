import mongoose from "mongoose";

/**
 * Custom Joi validator for MongoDB ObjectId.
 * @param {string} value - The value to validate.
 * @param {Object} helpers - Joi helpers object.
 * @returns {string} - The validated value.
 * @throws {Error} - Throws an error if the value is not a valid MongoDB ObjectId.
 */
const mongoId = (value, helpers) => {
    if (mongoose.Types.ObjectId.isValid(value)) {
        return value;
    }
    throw new Error("Invalid MongoDB ObjectId");
};

/**
 * Custom Joi validator for password.
 * @param {string} value - The value to validate.
 * @param {Object} helpers - Joi helpers object.
 * @returns {string} - The validated value.
 * @throws {Error} - Throws an error if the value does not meet the password criteria.
 */
const Password = (value, helpers) => {
    const specialCharacterFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (value.length < 8) {
        throw new Error("Password must be at least 8 characters");
    }

    if (value.search(/[0-9]/) === -1) {
        throw new Error("Password must contain at least one number");
    }

    if (value.search(/[a-z]/) === -1) {
        throw new Error("Password must contain one lower case character");
    }

    if (value.search(/[A-Z]/) === -1) {
        throw new Error("Password must contain one upper case character");
    }

    if (!specialCharacterFormat.test(value)) {
        throw new Error("Password must contain special character");
    }

    return value;
};

export { mongoId, Password };
