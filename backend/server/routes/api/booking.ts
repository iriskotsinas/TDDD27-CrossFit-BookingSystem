import express, { Request, Response } from 'express';
import { Session } from '../../models/session';
import { auth } from './verifyToken';
import { User } from '../../models/user';

const router = express.Router();

router.get('/booking', async (req: Request, res: Response) => {
  const session = await Session.find({}).sort({ date: 'ascending' });
  return res.status(200).send(session);
});

router.get('/users', auth, async (req: Request, res: Response) => {
  const { id } = req.query;

  const session = await Session.findOne({ _id: id });
  const users = await User.find({ _id: session.users });

  return res.status(201).json({ users });
});

router.post('/booking', auth, async (req: Request, res: Response) => {
  const {
    activity, date, maxSlots, description, instructor, length,
  } = req.body;

  const session = new Session({
    activity, date, maxSlots, description, instructor, length,
  });
  await session.save();
  return res.status(201).send(session);
});

router.delete('/booking', auth, async (req: Request, res: Response) => {
  const { id } = req.body;
  const users = await User.find({ sessions: { _id: id } });

  Object.keys(users).forEach(async (user) => {
    users[user].sessions.pull(id);
    await users[user].save();
  });

  await Session.deleteOne({ _id: id });
  return res.status(201).send('Session deleted');
});

router.post('/signup', auth, async (req: Request, res: Response) => {
  const { userId, id } = req.body;
  const session = await Session.findOne({ _id: id });
  const userExists = await Session.findOne({ _id: id, users: { _id: userId } });
  if (userExists) return res.json({ error: 'User already signed up for that session.' });
  const user = await User.findOne({ _id: userId });
  user.sessions.push(id);
  session.users.push(userId);
  await session.save();
  await user.save();
  return res.status(201).json({ user });
});

router.delete('/signup', auth, async (req: Request, res: Response) => {
  const { userId, id } = req.body;
  const session = await Session.findOne({ _id: id });
  const user = await User.findOne({ _id: userId });
  user.sessions.pull(id);
  session.users.pull(userId);
  await session.save();
  await user.save();
  return res.status(201).json({ user });
});

export default router;
