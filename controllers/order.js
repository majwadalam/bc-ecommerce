import Product from "../models/Product.js";
import Order from "../models/order.js";

export const getOrders = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skipIndex = (page - 1) * limit;

    try {
        const orders = await Order.find()
            .sort({ _id: 1 })
            .limit(limit)
            .skip(skipIndex);
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getOrdersByUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skipIndex = (page - 1) * limit;

    try {
        const orders = await Order.find({ user: req.userId })
            .sort({ _id: 1 })
            .limit(limit)
            .skip(skipIndex);
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createOrder = async (req, res) => {
    try {
        const { products } = req.body;

        const productsExist = await Product.find({ _id: { $in: products } });

        if (productsExist.length !== products.length) {
            return res.status(404).json({ message: "One or more products do not exist" });
        }

        const total = productsExist.reduce((acc, product) => acc + product.price, 0);

        const newOrder = await Order.create({
            user: req.userId,
            products,
            total
        });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateOrder = async (req, res) => {
    const { id: _id } = req.params;
    const order = req.body;

    const updatedOrder = await Order.findByIdAndUpdate
        (_id, { ...order, _id }, { new: true });
    res.json(updatedOrder);
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);
    res.json({ message: "Order deleted successfully" });
}