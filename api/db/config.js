import mongoose from "mongoose";

async function connectToDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/asahi-consultancy");
    console.log("Connected to MongoDB database");
  } catch (error) {
    console.log("Couldnot connect to MongoDB database", error.message);
  }
}

export { connectToDB };
