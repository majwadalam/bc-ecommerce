import { Router } from "express";

import {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/product.js";

import verifyToken from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

const router = Router();

router.get("/", getProducts); // tested
router.get("/:id", getProduct); // tested
router.post("/", verifyToken, isAdmin, createProduct); // tested // { name: "name", description: "description", price: 100, category: "category id", stock: 100, images: [image1, image2] }
router.patch("/:id", verifyToken, isAdmin, updateProduct); // might need work // { name: "name", description: "description", price: 100, category: "category id", stock: 100, images: [image1, image2] }
router.delete("/:id", verifyToken, isAdmin, deleteProduct); // tested

export default router;