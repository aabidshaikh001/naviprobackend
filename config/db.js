
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI; // Fetch URI from environment variables
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }); // Simplified connection
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Database connection error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
