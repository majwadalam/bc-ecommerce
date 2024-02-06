import Product from "../models/Product.js";
import mongoose from "mongoose";
import uploadImage from "../utils/uploadImage.js";

export const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skipIndex = (page - 1) * limit;

    try {
        const products = await Product.find()
            .sort({ _id: 1 })
            .limit(limit)
            .skip(skipIndex);
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product
            .findById(id)
            .populate("category", "name");
        res.status(200).json(product);
    }

    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, images } = req.body;
        const imageLinks = images ? await Promise.all(images.map(async image => (await uploadImage(image)).url)) : [];

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            images: imageLinks
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id: _id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No product with that id");

    const updatedProduct = await Product.findByIdAndUpdate(_id, { ...product, _id }, { new: true });
    res.json(updatedProduct);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No product with that id");

    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
}

