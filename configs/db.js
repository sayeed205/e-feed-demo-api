import chalk from "chalk";
import * as mongoose from "mongoose";

/**
 * This function connects to a MongoDB database using Mongoose.
 * @returns {Promise<object>} A promise that resolves to the connected database object.
 */
const connectDB = async () => {
    const DB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/efeed";
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        });
        // Log the successful connection to the console using the chalk library for formatting
        console.log(
            chalk.green("\nMongoDB connected"),
            chalk.blue("Name:"),
            chalk.yellow(conn.connection.name),
            chalk.blue("Host:"),
            chalk.yellow(conn.connection.host)
        );
        // Return the connected database object
        return conn.connection.db;
    } catch (error) {
        // Log any errors that occur and exit the process with an error code
        console.log(chalk.red(`Error: ${error.message}`));
        process.exit(1);
    }
};

// Export the connectDB function as the default export of this module
export default connectDB;
