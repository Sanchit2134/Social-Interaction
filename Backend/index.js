import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';
import messageRoute from './routes/messageRoute.js';
import {app, server} from './socket/socket.js';
import path from 'path'; 
dotenv.config();

const _dirname = path.resolve();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration - allow multiple origins
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or same-origin requests)
        if (!origin) return callback(null, true);
        
        // In development, allow all localhost origins
        if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
            return callback(null, true);
        }
        
        // In production, check against allowed origins
        const allowedOrigins = [
            process.env.FRONTEND_URL,
            process.env.URL,
            'https://social-interaction-2.onrender.com'
        ].filter(Boolean);
        
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);  
app.use("/api/v1/post", postRoute);  
app.use("/api/v1/message", messageRoute);  
app.use(express.static(path.join(_dirname, '/Frontend/dist')));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, 'Frontend', 'dist', 'index.html'));
})
app.get("/", (_, res) => {
  return res.status(200).json({  
    message: "Hello, World!",
    success: true,
  });
});

server.listen(port, () => {
  connectDB();
  console.log(`Server started on port ${port}`);
})