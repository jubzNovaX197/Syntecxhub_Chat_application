import { Router } from 'express';
import { getMe, login, logout, register } from '../controllers/auth.controller.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { loginValidator, registerValidator } from '../validators/auth.validator.js';

const router = Router();

router.post('/register', registerValidator, validateRequest, register);
router.post('/login', loginValidator, validateRequest, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;
