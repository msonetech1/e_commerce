import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const getStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalRevenue = await Order.aggregate([
            { $match: { isPaid: true } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        res.json({
            totalProducts,
            totalOrders,
            totalUsers,
            revenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
