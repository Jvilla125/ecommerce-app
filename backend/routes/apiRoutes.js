const express = require('express');
const app = express()

const productRoutes = require('./productRoutes')

// from server.js if the URL first part is /api and second is /products
// /api/products, then it is handled to productRoutes.js

app.use('/products', productRoutes);

module.exports = app;