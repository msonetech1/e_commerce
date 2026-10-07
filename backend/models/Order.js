import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        orderItems: [],
        shippingAddress: {
            address: String,
            city: String,
            zipCode: String,
            phone: String
        },
        totalPrice: Number,
        paymentMethod: { type: String, required: true },
        isPaid: { type: Boolean, default: false },
        status: { type: String, default: "Pending" }
    },
    { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
