const mongoose = require("mongoose");

// User model is needed for OrderModel to keep track of who's order it is
// Will have a one-to-one relationship
const User = require('./UserModel');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // References to User model, database query will be simpler
        ref: User
    },
    orderTotal: {
        itemsCount: { type: Number, required: true },
        cartSubtotal: { type: Number, required: true }
    },
    // we can have many cart items, so we create an array
    cartItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            image: { path: { type: String, required: true } },
            // Quantity is the amount of items the user wants to purchase
            quantity: { type: Number, required: true },
            // Count is the total amount of items available in stock
            count: { type: Number, required: true },
        }
    ],
    paymentMethod: {
        type: String,
        required: true,
    },
    transactionResult: {
        status: { type: String },
        createTime: { type: String },
        amount: { type: Number }
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    deliveredAt: {
        type: Date
    }
}, {
    timestamps: true,
})

const Order = mongoose.model("Order", orderSchema);
// App is listening for on change event on the orders collection, this handler will be executed
Order.watch().on("change", (data) => {
    console.log(data);
    if (data.operationType === "insert") {
        io.emit("newOrder", data.fullDocument);
    }
})
module.exports = Order;