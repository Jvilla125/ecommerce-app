const express = require('express');
const router = express.Router();
const {getCategories, newCategory, deleteCategory, saveAttr} = require('../controllers/categoryController');

const { verifyIsLoggedIn, verifyIsAdmin} = require("../middleware/verifyAuthToken");

router.get("/", getCategories);

router.use(verifyIsLoggedIn); // middelware is used in order to use the following routes
router.use(verifyIsAdmin);
router.post("/", newCategory);
router.delete("/:category", deleteCategory);
router.post('/attr', saveAttr);

module.exports = router