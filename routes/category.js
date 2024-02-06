import { Router } from 'express';

const router = Router();

import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from '../controllers/category.js';

import verifyToken from '../middleware/verifyToken.js';
import isAdmin from '../middleware/isAdmin.js';

router.get('/', getCategories); // tested
router.post('/', verifyToken, isAdmin, createCategory); // tested // { name: "category name" }
router.get('/:id', getCategory);  // tested
router.patch('/:id', verifyToken, isAdmin, updateCategory); // tested { name: "category name" }
router.delete('/:id', verifyToken, isAdmin, deleteCategory); // tested

export default router;