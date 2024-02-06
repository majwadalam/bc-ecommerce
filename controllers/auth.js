import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User already exists");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: encryptedPassword,
            role: "user",
        });

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User doesn't exist");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send("Invalid credentials");
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};