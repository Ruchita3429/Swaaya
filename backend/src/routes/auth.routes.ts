import express from 'express';
import { signup, login, logout, getCurrentUser } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { validateSignup, validateLogin } from '../middleware/validation.middleware';

const router = express.Router();

// Public routes
router.post('/register', validateSignup, signup);
router.post('/login', validateLogin, login);

// Protected routes
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getCurrentUser);

export default router;


