import { Router } from 'express';

import {
    createOrder,
    getOrders,
    getOrder,
    updateOrder,
    deleteOrder
} from '../controllers/order.js';

import verifyToken from '../middleware/verifyToken.js';
import isAdmin from '../middleware/isAdmin.js';

const router = Router();

router.get('/', verifyToken, isAdmin, getOrders); // tested
router.get('/user', verifyToken, getOrders); // tested
router.post('/', verifyToken, createOrder); // tested // { order: { products: [{ product: "product id", quantity: 100 }] } }
router.get('/:id', verifyToken, getOrder); // tested
router.patch('/:id', verifyToken, isAdmin, updateOrder); // tested // { status: "status" }
router.delete('/:id', verifyToken, isAdmin, deleteOrder); // tested

export default router;