const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

const apiRoutes = require('./routes/apiRoutes');

// mongodb connection
const connectDB = require('./config/db')
connectDB();

// This is called Middleware
// app.get('/') handles http request from the user 
// app.get takes two arguments, "/" routing and (req,res) that handles the path
// request and response
app.get('/', async (req, res, next) => {
    res.json({message: "API running..."})
})

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