import {Server} from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors:{
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
                return callback(null, true);
            }
            const allowedOrigins = [
                process.env.FRONTEND_URL,
                'https://social-interaction-2.onrender.com',
                process.env.URL
            ].filter(Boolean);
            
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            
            callback(new Error('Not allowed by CORS'));
        },
        methods:['GET','POST'],
        credentials: true
    }
})

const userSocketMap = {} ; // this map stores socket id corresponding the user id; userId -> socketId

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on('connection', (socket)=>{
    const userId = socket.handshake.query.userId;
    if(userId){
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect',()=>{
        if(userId){
            delete userSocketMap[userId];
        }
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
})

export {app, server, io};