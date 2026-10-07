import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        isNew: { type: Boolean, default: false }
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
