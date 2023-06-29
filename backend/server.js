
const express = require('express')
const app = express()
const port = 3000

const apiRoutes = require('./routes/apiRoutes');

// This is called Middleware
// app.get('/') handles http request from the user 
// app.get takes two arguments, "/" routing and (req,res) that handles the path
// request and response
app.get('/', (req, res) => {
    res.json({message: "API running..."})
})
// mongodb connection
const connectDB = require('./config/db')
connectDB();

// if URL starts with /api, then it is handled with apiRoutes.js
app.use('/api', apiRoutes)

// Create middleware to handle errors instead of express's default error
app.use((error, req, res, next) => {
    console.error(error)
    next(error)
})
app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})