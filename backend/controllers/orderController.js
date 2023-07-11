// Controller methods will be performing actual database operations for our app
const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel')
const ObjectId = require("mongodb").ObjectId;

const getUserOrders = async (req, res, next) => {
    try {
        // find all of the orders where user id matches the order request
        const orders = await Order.find({ user: ObjectId(req.user._id) });
        res.send(orders);
    } catch (error) {
        next(error)
    }
}

const getOrder = async (req, res, next) => {
    try {
        // Getting users info from order model (reference) by getting Order's ID
        // populate users info without password, isAdmin, id, createdAt, and updatedAt infro
        const order = await Order.findById(req.params.id).populate("user", "-password -isAdmin -_id -__v -createdAt -updatedAt").orFail()
        res.send(order)
    } catch (error) {
        next(error)
    }
}

const createOrder = async (req, res, next) => {
    try {
        const { cartItems, orderTotal, paymentMethod } = req.body;
        if (!cartItems || !orderTotal || !paymentMethod) {
            return res.status(400).send("All inputs are required");
        }
        // need to collect id #'s of each item added to the cart
        // need to update the sales of the product collection
        let ids = cartItems.map((item) => {
            return item.productID;
        })
        // collect the quantity of each item added to the cart
        let qty = cartItems.map((item) => {
            return Number(item.quantity);
        })

        // Each of the product we update the final sale
        await Product.find({ _id: { $in: ids } }).then((products) => {
            products.forEach(function (product, idx) {
                product.sales += qty[idx];
                product.save()
            })
        })

        const order = new Order({
            user: ObjectId(req.user._id),
            orderTotal: orderTotal,
            cartItems: cartItems,
            paymentMethod: paymentMethod,
        })
        const createdOrder = await order.save()
        res.status(201).send(createdOrder)

    } catch (error) {
        next(error)
    }
}

// Update order is paid
const updateOrderToPaid = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).orFail();
        order.isPaid = true;
        order.paidAt = Date.now();

        const updatedOrder = await order.save()
        res.send(updatedOrder);

    } catch (error) {
        next(error)
    }
}

// Admin function: update order to be delivered 
const updateOrderToDelivered = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).orFail();
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = await order.save();
        res.send(updatedOrder);
    } catch (error) {
        next(error)
    }
}

// Admin function: get a list of Orders
const getOrders = async (req, res, next) => {
    try {
        // find all orders and get user data except the password property
        // sort by paymentMethod in descending order (Z-A)
        const orders = await Order.find({}).populate("user", "-password").sort({ paymentMethod: "desc" });
        res.send(orders)
    } catch (error) {
        next(error)
    }
}

// Admin function 
const getOrderForAnalysis = async (req, res, next) => {
    try {
        const start = new Date(req.params.date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(req.params.date);
        end.setHours(23, 59, 59, 999);

        const order = await Order.find({
            createdAt: {
                $gte: start,
                $lte: end,
            }
        }).sort({ createdAt: "asc" })
        res.send(order);

    } catch (error) {
        next(error)
    }
}
module.exports = {
    getUserOrders,
    getOrder,
    createOrder,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
    getOrderForAnalysis
}