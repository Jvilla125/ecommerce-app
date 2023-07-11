const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin} = require('../middleware/verifyAuthToken')
const { getUsers, registerUser,
    loginUser, updateUserProfile } = require('../controllers/userController');

router.post("/register", registerUser);
router.post("/login", loginUser)


// user logged in routes:
router.use(verifyIsLoggedIn)
router.put("/profile", updateUserProfile) // put request is used to update


// admin routes: 
router.use(verifyIsAdmin);
router.get("/", getUsers);




module.exports = router