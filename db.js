import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://Outer:Outer@cluster0.hgrj1r3.mongodb.net/";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Succesfully!!!!!!!! Second Branch");
  } catch (error) {
    console.log("Mongo DB Connected Failed");
  }
}