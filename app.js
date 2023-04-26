// Import required modules
import chalk from "chalk";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

// Import custom modules
import connectDB from "./configs/db.js";
import "./configs/setEnv.js";
import errorHandler from "./middleware/errorHandler.js";
import authRouter from "./routes/auth.routes.js";
import bookRouter from "./routes/book.routes.js";

// Load environment variables
if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: ".env.local" });
} else {
    dotenv.config({ path: ".env" });
}

// Create an instance of express app
const app = express();

// Set up the port number
const PORT = process.env.PORT || 5000;

// Set up middleware
app.use(express.json());
app.use(morgan("dev"));

// Set up routes
app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);

// Set up error handling middleware
app.use(errorHandler);

// Set up the server to listen to incoming requests
const server = app.listen(PORT, async () => {
    // Connect to the database
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

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
    // Log the error message in red color
    console.log(chalk.red(`Error: ${err.message}`));

    // Close the server and exit the process
    console.log(err);
    server.close(() => {
        console.log(chalk.red("Server closed due to unhandled rejection"));
        process.exit(1);
    });
});
