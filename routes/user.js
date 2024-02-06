import { Router } from "express";

import {
    getUser,
    getUsers
} from "../controllers/user.js";

const router = Router();

import verifyToken from "../middleware/verifyToken.js";
import isAdmin from "../middleware/isAdmin.js";

router.get("/", verifyToken, isAdmin, getUsers); // tested
router.get("/:id", verifyToken, getUser); // tested

export default router;