import chalk from "chalk";
import { ValidationError } from "express-validation";

const errorHandler = (err, req, res, next) => {
    // if (err) {
    console.log(
        chalk.red(
            `Error: ${err.message} | Status: ${
                err.statusCode || err.status || "Server Error 500"
            }`
        )
    );
    console.log(err);

    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({
            ok: false,
            error: { msg: err.message, details: err.details },
        });
    }

    return res.status(err.statusCode || err.status || 500).json({
        ok: false,
        error: { msg: err.message },
    });
    // }
};

export default errorHandler;
