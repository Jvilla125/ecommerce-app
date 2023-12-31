const { createServer } = require("http");
const { Server } = require("socket.io") // used npm i socket.io for backend and socket.io-client for frontend
const express = require('express')
const fileUpload = require("express-fileupload") // used npm i express-fileupload in order to upload file images
const cookieParser = require('cookie-parser') // used npm install cookie-parser 
const app = express();

const httpServer = createServer(app);
global.io = new Server(httpServer);


app.use(express.json())
app.use(cookieParser()) // used cookie-parser as a middleware 
app.use(fileUpload()) // used npm i express-fileupload in order to upload file images

const admins = [];
let activeChats = [];
function get_random(array) {
    return array[Math.floor(Math.random() * array.length)];
}

io.on("connection", (socket) => {
    socket.on("admin connected with server", (adminName) => {
        admins.push({ id: socket.id, admin: adminName })
    })
    socket.on("client sends message", (msg) => {
        if (admins.length === 0) {
            socket.emit("no admin", "")
        } else {
            let client = activeChats.find((client) => client.clientId === socket.id);
            let targetAdminId;
            if (client) {
                targetAdminId = client.adminId;
            } else {
                let admin = get_random(admins);
                activeChats.push({ clientId: socket.id, adminId: admin.id });
                targetAdminId = admin.id;
            }
            socket.broadcast.to(targetAdminId).emit("server sends message from client to admin", {
                user: socket.id,
                message: msg,
            })
        }
    })

    socket.on("admin sends message", ({ user, message }) => {
        socket.broadcast.to(user).emit("server sends message from admin to client", message);
    });

    socket.on("admin closes chat", (socketId) => {
        socket.broadcast.to(socketId).emit("admin closed chat", "");
        let c = io.sockets.sockets.get(socketId);
        c.disconnect(); // reason: server namespace disconnect
    })

    socket.on("disconnect", (reason) => {
        // admin disconnected 
        const removeIndex = admins.findIndex((item) => item.id === socket.id);
        if (removeIndex !== -1) {
            admins.splice(removeIndex, 1);
        }
        activeChats = activeChats.filter((item) => item.adminId !== socket.id);

        // client disconnected
        const removeIndexClient = activeChats.findIndex((item) => item.clientId === socket.id);
        if (removeIndexClient !== -1) {
            activeChats.splice(removeIndexClient, 1);
        }
        socket.broadcast.emit("disconnected", { reason: reason, socketId: socket.id })
    })
})

const apiRoutes = require('./routes/apiRoutes');

// mongodb connection
const connectDB = require('./config/db')
connectDB();

// This is called Middleware
// app.get('/') handles http request from the user 
// app.get takes two arguments, "/" routing and (req,res) that handles the path
// request and response
app.get('/', async (req, res, next) => {
    res.json({ message: "API running..." })
})

// if URL starts with /api, then it is handled with apiRoutes.js
app.use('/api', apiRoutes)

// Create middleware to handle errors instead of express's default error
app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        console.error(error)
    }
    next(error)
})
app.use((error, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        res.status(500).json({
            message: error.message,
            stack: error.stack
        })
    } else {
        res.status(500).json({
            message: error.message
        })
    }
})

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))