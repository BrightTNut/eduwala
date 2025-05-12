import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export function connect() {
  mongoose
    .connect(process.env.MONGOOSE_URL)
    .then(() => console.log("Connected to database"))
    .catch((e) => {
      console.log(`Error connecting to database:e`, e);
      console.error(e);
      process.exit(1); // Exit the process with failure});
    });
}
