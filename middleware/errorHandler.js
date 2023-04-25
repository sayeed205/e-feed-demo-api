import chalk from "chalk";

const errorHandler = (err, req, res, next) => {
    if (err) {
        console.log(
            chalk.red(
                `Error: ${err.message} | Status: ${
                    err.statusCode || err.status || "Server Error 500"
                }`
            )
        );

        console.log(err);

        return res.status(err.statusCode || err.status || 500).json({
            error: { msg: err.message },
            ok: false,
        });
    }
};

export default errorHandler;
