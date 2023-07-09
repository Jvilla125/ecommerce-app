// Controller methods will be performing actual database operations for our app
const User = require('../models/UserModel');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select("-password")
        return res.json(users)
        //fetch all users from database ({})
        // .select("-password") excludes what will be sent in the json 
    } catch (error) {
        next(error)
    }
}

const registerUser = async (req, res, next) => {
    try {
        const { name, lastName, email, password } = req.body
        if (!(name && lastName && email && password)) { // if any of the input fields are missing
            // it will be a 400 (user) error 
            return res.status(400).send("All inputs are required")
        }
        // find a user by looking up their email in the database
        const userExists = await User.findOne({ email })
        // if userExist is true -> return user error json response with user exists
        // if userExist is false -> create new user
        if (userExists) {
            return res.status(400).json({ error: "user exists" })
        } else {
            const user = await User.create({
                name,
                lastName,
                email: email.toLowerCase(),
                password: password
            })
            res.status(201).send(user) //if user was created successfully, it will return a success message
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    registerUser,
}
