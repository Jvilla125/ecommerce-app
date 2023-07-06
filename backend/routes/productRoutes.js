const express = require('express');
const router = express.Router();
const { getProducts, getProductsById, getBestSellers } = require("../controllers/productController")

// The URL is /api/products and the response to the user will be the following:
// handler in the routes will be handled in controller (separate file)
router.get("/category/:categoryName/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/", getProducts);
router.get("/bestsellers", getBestSellers)
router.get("/:id", getProductsById)

module.exports = router