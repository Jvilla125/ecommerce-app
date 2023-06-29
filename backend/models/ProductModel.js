const mongoose = require("mongoose");

// How data is going to be stored in mongoose
// Schema is the definition of the property
const productSchema = mongoose.Schema({
    name: {
        type: String,
        // if we try to save without a name, it will throw an error
        // using required: true
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,

    },
    category: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    reviewsNumber: {
        type: Number,
    },
    sales: {
        type: Number,
        default: 0
    },
    attrs: [
        { key: { type: String }, value: { type: String } }
    ],
    // we can have many images and many reviews
    images: [],
    reviews: [],

}, {
    // When we save products in the database
    // Mongoose will automatically add 'created at' and 'updated at' time
    timestamps: true,
})

productSchema.index()

const Product = mongoose.model("Product", productSchema)

module.exports = Product