import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connect() {
  if (mongoose.connection.readyState === 1) {
    console.log("✅ Already connected.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("✅ Connected to database");
  } catch (e) {
    console.error("❌ Error connecting to database:", e.message);
    process.exit(1);
  }
}
