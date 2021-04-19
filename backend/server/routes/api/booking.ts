import express, { Request, Response } from 'express';
// import mongodb from 'mongodb'
import { Session } from '../../models/session';
import { auth } from './verifyToken';

const router = express.Router();

router.get('/booking', auth, async (req: Request, res: Response) => {
  const session = await Session.find({});
  return res.status(200).send(session);
});

router.post('/booking', auth, async (req: Request, res: Response) => {
  const {
    activity, date, users, maxSlots, description, instructor, length,
  } = req.body;

  const session = new Session({
    activity, date, users, maxSlots, description, instructor, length,
  });
  await session.save();
  return res.status(201).send(session);
});

export default router;
