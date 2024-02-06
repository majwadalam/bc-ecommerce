import { Router } from 'express';

import {
    register,
    login
} from '../controllers/auth.js';

const router = Router();

router.post('/register', register); // tested // { name: "name", email: "email", password: "password" }
router.post('/login', login); // tested // { email: "email", password: "password" }

export default router;