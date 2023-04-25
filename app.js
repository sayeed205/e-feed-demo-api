import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

/* <!----------------------------------- EXTRA IMPORTS -----------------------------------> */
import connectDB from "./configs/db.js";
import errorHandler from "./middleware/errorHandler.js";

/* <!----------------------------------- IMPORT ROUTES -----------------------------------> */
import authRouter from "./routes/auth.routes.js";

/* <!----------------------------------- LOAD ENV -----------------------------------> */
if (process.env.NODE_ENV !== "production")
    dotenv.config({ path: ".env.local" });
else dotenv.config({ path: ".env" });

const app = express();

const PORT = 5000 || process.env.PORT;

/* <!----------------------------------- MIDDLEWARE -----------------------------------> */
app.use(express.json());
app.use(morgan("dev"));

/* <!----------------------------------- ROUTES -----------------------------------> */
app.use("/api/auth", authRouter);

/* <!----------------------------------- ERROR HANDLING -----------------------------------> */
app.use(errorHandler);

/* <!----------------------------------- SERVER & DB SETUP -----------------------------------> */
app.listen(PORT, async () => {
    await connectDB();
    console.log(
        chalk.blue("Server is running on port"),
        chalk.yellow(PORT),
        chalk.blue("in"),
        chalk.yellow(process.env.NODE_ENV),
        chalk.blue("Base URL:"),
        chalk.yellow.underline(process.env.BACKEND_URL),
        "\n"
    );
});

/* <!---------------------------- UNHANDLED REJECTION HANDLER ----------------------------> */
process.on("unhandledRejection", (err) => {
    console.log(chalk.red(`Error: ${err.message}`));
    // Close server and exit process
    console.log(err);
    server.close(() => {
        console.log(chalk.red("Server closed due to unhandled rejection"));
        process.exit(1);
    });
});
