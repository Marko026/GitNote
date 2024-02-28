import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URI) return console.log("MONGODB_URL not found");

  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "gitNote",
    });
    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    throw new Error("MongoDB connection error");
  }
};
