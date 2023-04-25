import * as mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        });

        // Return the connected database object
        return conn.connection.db;
    } catch (err) {
        // Log any errors that occur.
        `Error: ${err.message}`;
    }
};

// Export the function that connects to the database
export default connectDB;
