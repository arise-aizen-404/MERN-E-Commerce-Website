import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected to MongoDB 👍💘😝");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

// export default connectDB;