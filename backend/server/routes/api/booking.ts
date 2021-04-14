import express, { Request, Response } from 'express';
// import mongodb from 'mongodb'
import { Data } from '../../models/data';
import { auth } from './verifyToken';

const router = express.Router();
router.get('/booking', auth, async (req: Request, res: Response) => {
  const data = await Data.find({});
  return res.status(200).send(data);
});
router.post('/booking', auth, async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const data = new Data({ title, description });
  await data.save();
  return res.status(201).send(data);
});

export default router;
