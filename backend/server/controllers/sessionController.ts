import { Request, Response } from 'express';
import { Session } from '../models/session';
import { User } from '../models/user';

export const getSession = async (req: Request, res: Response) => {
  const { date } = req.query;
  if (!date) return res.status(400);

  const nDate = new Date(date.toString());
  const end = new Date(nDate.getFullYear(), nDate.getMonth(), nDate.getDate() + 1, 0, 59, 59);
  const session = await Session.find({ date: { $gte: date, $lt: end } }).sort({ date: 'ascending' });

  return res.status(200).send(session);
};

export const getAllSessions = async (req: Request, res: Response) => {
  const sessions = await Session.find({}).sort({ date: 'ascending' });
  return res.status(200).json({ sessions });
};

export const getSessionUsers = async (req: Request, res: Response) => {
  const { id } = req.query;

  const session = await Session.findOne({ _id: id });
  const users = await User.find({ _id: session.users });

  return res.status(201).json({ users });
};

export const addSession = async (req: Request, res: Response) => {
  const {
    activity, date, maxSlots, description, instructor, length,
  } = req.body;
  const expireAt = date;
  const session = new Session({
    activity, date, expireAt, maxSlots, description, instructor, length,
  });

  await session.save();
  return res.status(201).send(session);
};

export const deleteSession = async (req: Request, res: Response) => {
  const { id, userId } = req.body;
  const users = await User.find({ sessions: { _id: id } });

  Object.keys(users).forEach(async (user) => {
    users[user].sessions.pull(id);
    await users[user].save();
  });

  await Session.deleteOne({ _id: id });
  const user = await User.findOne({ _id: userId });

  return res.status(201).json({ user });
};

export const signUpUser = async (req: Request, res: Response) => {
  const { userId, id } = req.body;
  const session = await Session.findOne({ _id: id });
  const userExists = await Session.findOne({ _id: id, users: { _id: userId } });

  if (userExists) return res.json({ error: 'User already signed up for that session.' });

  const user = await User.findOne({ _id: userId });
  if (session.users.length >= session.maxSlots) return res.json({ full: true, error: 'Session already full' });

  user.sessions.push(id);
  session.users.push(userId);

  await session.save();
  await user.save();

  return res.status(201).json({ user, session });
};

export const cancelSignUp = async (req: Request, res: Response) => {
  const { userId, id } = req.body;
  const session = await Session.findOne({ _id: id });
  const user = await User.findOne({ _id: userId });

  user.sessions.pull(id);
  session.users.pull(userId);

  await session.save();
  await user.save();

  return res.status(201).json({ user, session });
};
