// express by default is not able to read cookies
// need to npm install cookie-parser
const jwt = require("jsonwebtoken")
const verifyIsLoggedIn = (req, res, next) => {

    try {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(403).send("A token is required for authentication")
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded
            next()
        } catch (err) {
            return res.status(401).send("Unauthorized. Invalid Token")
        }

    } catch (err) {
        next(err)
    }
}
// once a user is logged in they will be given a cookie
// this function will check if a cookie exists
// Then it will determine if that cookie has admin authentication

const verifyIsAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) { // isAdmin is from userController.js loginUser function
        next() // go to the next routes in productRoutes.js
    } else {
        return res.status(401).send("Unauthorized. Admin required")
    }

}

module.exports = { verifyIsLoggedIn, verifyIsAdmin }