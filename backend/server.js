const express = require('express')
const app = express()
const port = 3000


const apiRoutes = require('./routes/apiRoutes');

// This is called Middleware
// app.get('/') handles http request from the user 
// app.get takes two arguments, "/" routing and (req,res) that handles the path
// request and response
app.get('/', (req, res) => {
    console.log("synchronous code")
    throw new Error("some error occured")
    res.json({message: "API running..."})
})

app.get("/a", (req,res,next) => {
    // Building Asynchronous code
    // Server goes to next line of code, doesn't wait for setTimeout() function to finish
    setTimeout(() => {
        // try catch is used to catch errors
        try {
            aconsole.log("asynchronous code");
        } catch (err){
            next(err);
        }
    }, 1000)
    // next(new Error("some error occured"))
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