import Order from "../models/Order.js";
import User from "../models/User.js";
import { sendOrderConfirmation, sendOrderStatusUpdate } from "../utils/emailService.js";

export const createOrder = async (req, res) => {
    if (req.user.isAdmin) {
        return res.status(403).json({ message: "Admins cannot place orders." });
    }

    try {
        const order = await Order.create({
            user: req.user.id,
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            totalPrice: req.body.totalPrice,
            isPaid: true // demo payment
        });

        // Send confirmation email
        const user = await User.findById(req.user.id);
        if (user) {
            await sendOrderConfirmation(user, order);
        }

        res.status(201).json({
            message: "Order placed and payment successful",
            order
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getOrders = async (req, res) => {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        ).populate("user", "name email");

        if (!order) return res.status(404).json({ message: "Order not found" });

        // Send status update email
        if (order.user) {
            await sendOrderStatusUpdate(order.user, order);
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
