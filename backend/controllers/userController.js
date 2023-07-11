// Controller methods will be performing actual database operations for our app
const User = require('../models/UserModel');
const Review = require('../models/ReviewModel')
const Product = require("../models/ProductModel")

const { hashPassword, comparePasswords } = require('../utils/hashPassword')
const generateAuthToken = require("../utils/generateAuthToken")


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
        if (!(name && lastName && email && password)) { // if any of the input fields are missing a 400 (user) error will be sent
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
            // After user is successfully created, the following will be returned
            // cookie will be created on the client side when a user is successfully created
            res.cookie("access_token", generateAuthToken(user._id, user.name, user.lastName,
                user.email, user.isAdmin),
                {
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

const loginUser = async (req, res, next) => {
    try {
        const { email, password, doNotLogout } = req.body; //doNotLogout is the checkbox
        if (!(email && password)) {
            return res.status(400).send("All inputs are required")
        }
        const user = await User.findOne({ email })
        // if user, return cookie and json with success message
        if (user && comparePasswords(password, user.password)) {
            // Note: Will need to compare input password and database password
            let cookieParams = {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            }
            if (doNotLogout) {
                cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 7 } // 1000 * 1ms 
            }
            return res.cookie(
                "access_token",
                generateAuthToken(
                    user._id,
                    user.name,
                    user.lastName,
                    user.email,
                    user.isAdmin
                ),
                cookieParams
            ).json({
                success: "user logged in",
                userLoggedIn: {
                    _id: user._id, name: user.name, lastName: user.lastName,
                    email: user.email, isAdmin: user.isAdmin, doNotLogout
                }
            });
        } else { // if not user, then return status 401
            return res.status(401).send("wrong credentials")
        }
    } catch (error) {
        next(error)
    }
}

const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).orFail();
        user.name = req.body.name || user.name; // if empty then use default user name
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber;
        user.address = req.body.address;
        user.country = req.body.country;
        user.zipCode = req.body.zipCode;
        user.city = req.body.city;
        user.state = req.body.state;
        if (req.body.password !== user.password) {
            user.password = hashPassword(req.body.password)
        }
        await user.save();
        // After successful update return json message
        res.json({
            success: "user updated",
            userUpdated: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin
            },
        });
    } catch (error) {
        next(error)
    }
}

const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).orFail() // req.params.id is fron userRoutes ":id"
        return res.send(user);
    } catch (error) {
        next(error)
    }
}

const writeReview = async (req, res, next) => {
    try {
        // get comment, rating from req.body:
        const { comment, rating } = req.body; // from user's input
        // validate request:
        if (!(comment && rating)) { // user will need to input both in order to write a review
            return res.status(400).send("All inputs are required");
        }
        // create a review id 
        const ObjectId = require("mongodb").ObjectId;
        let reviewId = ObjectId();

        await Review.create([
            {
                _id: reviewId,
                comment: comment,
                rating: Number(rating),
                user: { _id: req.user._id, name: req.user.name + " " + req.user.lastName },
            }
        ])

        const product = await Product.findById(req.params.productId).populate("reviews");

        // find a review's user id (through model reference)
        // Meaning that if a review already has a review from a user in the database
        // compare it to the user's new review
        // if they match, then that user has already provided a review 
        const alreadyReviewed = product.reviews.find((r) => r.user._id.toString()
        === req.user._id.toString()); 
        if(alreadyReviewed){
            return res.status(400).send("product already reviewed")
        }



        let prc = [...product.reviews];
        prc.push({ rating: rating });
        product.reviews.push(reviewId);

        if (product.reviews.length === 1) {
            product.rating = Number(rating);
            product.reviewsNumber = 1;
        } else {
            product.reviewsNumber = product.reviews.length;
            product.rating = prc.map((item) => Number(item.rating)).reduce((sum,
                item) => sum + item, 0) / product.reviews.length;
        }
        await product.save();

        res.send('review created')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    updateUserProfile,
    getUserProfile,
    writeReview
}
