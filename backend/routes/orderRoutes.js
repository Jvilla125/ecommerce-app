const express = require('express');
const router = express.Router();
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")
const { getUserOrders, getOrder, createOrder } = require('../controllers/orderController');

// user routes
router.use(verifyIsLoggedIn);
router.get("/", getUserOrders);
router.get("/user/:id", getOrder);
router.post("/", createOrder);


// admin routes
router.use(verifyIsAdmin);

module.exports = router