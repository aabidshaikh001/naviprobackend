import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userDetailsRoutes from "./routes/userDetailsRoutes.js"; // Import user details routes
import adminRoutes from './routes/adminDashboard.routes.js'
import qrRoutes from './routes/qrRoutes.js';

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middlewared
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: "https://www.navipro.in/", credentials: true }));

// Connect to the database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user-details", userDetailsRoutes);
app.use('/api', qrRoutes);
// Routes
app.use('/admin', adminRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
