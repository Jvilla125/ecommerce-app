const Product = require('../models/ProductModel');

const getProducts = (req,res) => {
    res.send("Handling product routes, e.g. search for products")
}

module.exports = getProducts