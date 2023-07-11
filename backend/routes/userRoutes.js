const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require('../middleware/verifyAuthToken')
const { getUsers, registerUser, loginUser,
    updateUserProfile, getUserProfile, writeReview } = require('../controllers/userController');

router.post("/register", registerUser);
router.post("/login", loginUser)

// user logged in routes:
router.use(verifyIsLoggedIn)
router.put("/profile", updateUserProfile) // put request is used to update
router.get("/profile/:id", getUserProfile) // get specific logged in user's profile 
router.post("/review/:productId", writeReview) //after user is verified, they will be able to post a review on specific product

// admin routes: 
router.use(verifyIsAdmin);
router.get("/", getUsers);

module.exports = router