import chalk from "chalk";
import { ValidationError } from "express-validation";

/**
 * Middleware to handle errors in the application
 * @param {Error} err - The error object
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const errorHandler = (err, req, res, next) => {
    console.log(
        chalk.red(
            `Error: ${err.message} | Status: ${
                err.statusCode || err.status || "Server Error 500"
            }`
        )
    );
    console.log(err);

    // Handle validation errors from express-validation
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({
            ok: false,
            error: { msg: err.message, details: err.details },
        });
    }

    // Handle other errors
    return res.status(err.statusCode || err.status || 500).json({
        ok: false,
        error: { msg: err.message },
    });
};

export default errorHandler;
