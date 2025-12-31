import express from 'express';
import { register, login, verifyEmail, getCurrentUser } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);

// Protected routes
router.get('/me', authenticateToken, getCurrentUser);

export default router;