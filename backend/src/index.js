import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js'; // MongoDB connection

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app ,server} from './lib/temp.js';
import path from 'path';

dotenv.config();
connectDB(); // connect to MongoDB


const PORT = process.env.PORT || 5001;
const __dirname = path.resolve(); // Get the current directory name
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser()); // Middleware to parse cookies
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies) to be sent
}));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React frontend app
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});
