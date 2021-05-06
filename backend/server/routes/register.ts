import express from 'express';
import { registerUser, assignAdmin } from '../controllers/registerController';

const router = express.Router();

// Register user
router.post('/register', registerUser);

// Assign user admin role
router.post('/admin', assignAdmin);

export default router;
