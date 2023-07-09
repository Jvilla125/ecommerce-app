// Controller methods will be performing actual database operations for our app
const User = require('../models/UserModel');
const { hashPassword } = require('../utils/hashPassword')

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

        const userExists = await User.findOne({ email }) // find a user by looking up their email in the database

        // if userExist is true -> return user error json response with user exists
        if (userExists) {
            return res.status(400).send("user exists");
        } else { // if userExist is false -> create new user
            const hashedPassword = hashPassword(password) // <- password comes from req.body
            const user = await User.create({
                name,
                lastName,
                email: email.toLowerCase(),
                password: hashedPassword // <- imported from utils/hashPassword file to be more secure
            })

            res
            .cookie("access_token", "fake access token", { // <- cookie will be created on the client side when a user is successfully created
                httpOnly: true, // <- the cookie can only be accessed using http protocol
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict" 
            }) 
                .status(201)
                .json({ // When a user is created, the following will be shown and password will not be shown
                    success: "User created",
                    userCreated: {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    },
                })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    registerUser,
}
