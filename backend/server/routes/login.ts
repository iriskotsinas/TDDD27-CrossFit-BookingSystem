import express from 'express';
import { login } from '../controllers/loginController';

const router = express.Router();

// Login
router.post('/login', login);

export default router;
