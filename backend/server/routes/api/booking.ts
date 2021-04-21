import express, { Request, Response } from 'express';
import { Session } from '../../models/session';
// import { auth } from './verifyToken';

const router = express.Router();

router.get('/booking', async (req: Request, res: Response) => {
  const session = await Session.find({});
  return res.status(200).send(session);
});

router.post('/booking', async (req: Request, res: Response) => {
  const {
    activity, date, users, maxSlots, description, instructor, length,
  } = req.body;

  const session = new Session({
    activity, date, users, maxSlots, description, instructor, length,
  });
  await session.save();
  return res.status(201).send(session);
});

router.post('/adduser', async (req: Request, res: Response) => {
  const { userId, id } = req.body;
  const session = await Session.findOne({ _id: id });
  const userExists = await Session.findOne({ _id: id, users: { _id: userId } });
  if (userExists) return res.json({ status: true, error: 'User already signed up for that session.' });
  session.users.push(userId);
  await session.save();
  return res.status(201).json({ status: true });
});

export default router;
