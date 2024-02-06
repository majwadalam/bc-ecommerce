import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    ],
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered"],
        default: "pending",
    },
    total: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;