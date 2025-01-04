import express from "express";
import { createServer } from "http"; // To create an HTTP server for Socket.IO
import { Server } from "socket.io"; // Import Socket.IO
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userDetailsRoutes from "./routes/userDetailsRoutes.js"; // Import user details routes
import adminRoutes from './routes/adminDashboard.routes.js';
import qrRoutes from './routes/qrRoutes.js';


// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ origin: "https://www.navipro.in", credentials: true }));

// Connect to the database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user-details", userDetailsRoutes);
app.use('/api', qrRoutes);
app.use('/admin', adminRoutes);
// Routes


// Create an HTTP server for Socket.IO
const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "https://www.navipro.in", // Allow requests from your frontend
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    
  
    socket.on("sendUpdate", (data) => {
    
      // Broadcast to all clients
      socket.broadcast.emit("receiveUpdate", {
        message: data.message,
        price: data.price,
        limits: data.limits || {}, // Broadcast limits if available
      });
    });
    // socket.on("showForm", (data) => {
    //   console.log("Show form event received:", data);
    //   io.emit("showForm", data); // Broadcast the event to all connected clients
    // });
  
    socket.on("sendPaid", (data) => {
      console.log("Paid Event:", data);
      socket.broadcast.emit("receivePaid", data);
    });
    
  
    socket.on("disconnect", () => {
      
    });
  });
 
  
  

// Start the server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
