import dotenv from "dotenv";
import express from "express";

/* <!----------------------------------- LOAD ENV -----------------------------------> */
if (process.env.NODE_ENV !== "production")
    dotenv.config({ path: ".env.local" });
else dotenv.config({ path: ".env" });

const app = express();

const PORT = 5000 || process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
