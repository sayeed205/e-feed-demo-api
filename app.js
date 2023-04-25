import dotenv from "dotenv";
import express from "express";
import connectDB from "./configs/db.js";

/* <!----------------------------------- LOAD ENV -----------------------------------> */
if (process.env.NODE_ENV !== "production")
    dotenv.config({ path: ".env.local" });
else dotenv.config({ path: ".env" });

const app = express();

const PORT = 5000 || process.env.PORT;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});
