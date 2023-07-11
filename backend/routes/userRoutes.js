const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken')
const { getUsers, registerUser, loginUser,
    updateUserProfile, getUserProfile, writeReview, 
    getUser, updateUser, deleteUser} = require('../controllers/userController');

router.post("/register", registerUser);
router.post("/login", loginUser)

// user logged in routes:
router.use(verifyIsLoggedIn)
router.put("/profile", updateUserProfile) // put request is used to update
router.get("/profile/:id", getUserProfile) // get specific logged in user's profile 
router.post("/review/:productId", writeReview) //after user is verified, they will be able to post a review on specific product

// admin routes: 
router.use(verifyIsAdmin);
router.get("/", getUsers); // admin will be able to get a list of all Users
router.get("/:id", getUser); //admin will be able to get access to user by their id
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router