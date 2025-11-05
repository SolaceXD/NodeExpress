import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://Outer:Outer@cluster0.hgrj1r3.mongodb.net/novenoa";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Succesfully!!!!!!!!");
  } catch (error) {
    console.log("Mongo DB Connected Failed");
  }
}