const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    comment: { type: String, required: true },
    review: { type: Number, required: true },
    user: {
        _id: {type: mongoose.Schema.Types.ObjectId, required: true},
        user: {type: String, required: true}
    }
}, {
    timestamps: true,
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review;