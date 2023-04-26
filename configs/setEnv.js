import chalk from "chalk";
import dotenv from "dotenv";

/* <!----------------------------------- LOAD ENV -----------------------------------> */
if (process.env.NODE_ENV !== "production")
    dotenv.config({ path: ".env.local" });
else dotenv.config({ path: ".env" });

// Check if all the required env variables are set
const requiredEnvVars = [
    "NODE_ENV",
    "PORT",
    "BACKEND_URL",
    "MONGO_URI",
    "JWT_SECRET",
];
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.log(
            chalk.red(
                `Error: ${chalk.black.bgRed(
                    envVar
                )} is not set in the environment variables`
            )
        );
        process.exit(1);
    }
});
