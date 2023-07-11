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
        let ids = cartItems.map((item) => {
            return item.productID;
        })
        let qty = cartItems.map((item) => {
            return Number(item.quantity);
        })

        await Product.find({ _id: { $in: ids } }).then((products) =>{
            products.forEach(function(product, idx){
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

module.exports = {
    getUserOrders,
    getOrder,
    createOrder
}