import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("Missing MONGO_URI in environment variables");
    }

    await mongoose.connect(MONGO_URI);
    console.log(" MongoDB Connected Successfully!");
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error.message);
  }
};
