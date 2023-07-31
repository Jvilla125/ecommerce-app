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

io.on("connection", (socket) => {
    socket.on("client sends message", (msg) => {
        console.log(msg);
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