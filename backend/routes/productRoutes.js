const express = require('express');
const router = express.Router();
const { getProducts, getProductsById, getBestSellers,
    adminGetProducts, adminDeleteProduct, adminCreateProduct,
    adminUpdateProduct, adminUpload, adminDeleteProductImage } = require("../controllers/productController")

const {verifyIsLoggedIn, verifyIsAdmin} = require("../middleware/verifyAuthToken")

// The URL is /api/products and the response to the user will be the following:
// handler in the routes will be handled in controller (separate file)
router.get("/category/:categoryName/search/:searchQuery", getProducts);
router.get("/category/:categoryName", getProducts);
router.get("/search/:searchQuery", getProducts);
router.get("/", getProducts);
router.get("/bestsellers", getBestSellers);
router.get("/get-one/:id", getProductsById);

// admin routes: 
router.use(verifyIsLoggedIn) // middleware to verify if user has login access token
router.use(verifyIsAdmin) // middleware to verify if access token has admin authorization
router.get("/admin", adminGetProducts);
router.delete("/admin/:id", adminDeleteProduct)
router.delete("/admin/image/:imagePath/:productId", adminDeleteProductImage)
router.put("/admin/:id", adminUpdateProduct)
router.post("/admin/upload", adminUpload)
router.post("/admin", adminCreateProduct)

module.exports = router