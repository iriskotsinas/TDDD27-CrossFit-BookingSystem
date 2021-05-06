import express from 'express';
import { auth } from './verifyToken';
import {
  getSession, getAllSessions, getSessionUsers, addSession, deleteSession, signUpUser, cancelSignUp,
} from '../controllers/sessionController';

const router = express.Router();

// Get session by date
router.get('/session', getSession);

// Get all sessions
router.get('/sessions', getAllSessions);

// Get users registered on session
router.get('/users', auth, getSessionUsers);

// Add new session
router.post('/session', auth, addSession);

// Delete session
router.delete('/session', auth, deleteSession);

// Sign-up user to session
router.post('/signup', auth, signUpUser);

// Cancel sign up
router.delete('/signup', auth, cancelSignUp);

export default router;
