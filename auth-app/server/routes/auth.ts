import express from 'express';
import { register, login, verifyEmail, getCurrentUser, forgotPassword, resetPassword, updateEmail } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', authenticateToken, getCurrentUser);
router.put('/update-email', authenticateToken, updateEmail);

export default router;