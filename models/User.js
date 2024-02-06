import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;