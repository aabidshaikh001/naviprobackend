import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userDetailsRoutes from "./routes/userDetailsRoutes.js"; // Import user details routes
import adminRoutes from './routes/adminDashboard.routes.js';
import qrRoutes from './routes/qrRoutes.js';

import { updatesRef, paymentsRef } from "./config/firebase.js";


// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: process.env.FRONTENDURL, credentials: true }));

// Connect to the database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user-details", userDetailsRoutes);
app.use('/api', qrRoutes);
app.use('/admin', adminRoutes);
// Firebase Realtime Database reference

// Routes


// ✅ Firebase Update Route
app.post("/api/sendUpdate", async (req, res) => {
  try {
    const { message, price, limits, buttonLabel } = req.body;
    await updatesRef.push({ message, price, limits, buttonLabel, timestamp: Date.now() });
    res.status(200).json({ success: true, message: "Update sent!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send update.", error: error.message });
  }
});

// ✅ Firebase Payment Route
app.post("/api/sendPaid", async (req, res) => {
  try {
    const { data } = req.body;
    await paymentsRef.push({ ...data, timestamp: Date.now() });
    res.status(200).json({ success: true, message: "Payment event sent!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send payment event.", error: error.message });
  }
})
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
