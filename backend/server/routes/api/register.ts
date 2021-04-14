import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';
import { registerValidation } from '../../validation';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  const { error } = registerValidation(req.body);
  if (error) return res.json({ status: false, error: error.details[0].message });

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.json({ status: false, error: 'Account with that email already exists' });

  // encryption
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    await user.save();
    let token: string = '';
    if (process.env.TOKEN_SECRET) {
      token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    } else {
      res.status(400).send('SECRET not found');
    }
    return res.json({
      status: true,
      token,
      user,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

export default router;
