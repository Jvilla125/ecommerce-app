const express = require('express');
const router = express.Router();
const { getProducts, getProductsById, getBestSellers,
    adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct } = require("../controllers/productController")

// The URL is /api/products and the response to the user will be the following:
// handler in the routes will be handled in controller (separate file)
router.get("/category/:categoryName/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/", getProducts);
router.get("/bestsellers", getBestSellers);
router.get("/get-one/:id", getProductsById);

// admin routes:
router.get("/admin", adminGetProducts);
router.delete("/admin/:id", adminDeleteProduct)
router.put("/admin/:id", adminUpdateProduct)
router.post("/admin", adminCreateProduct)

module.exports = router