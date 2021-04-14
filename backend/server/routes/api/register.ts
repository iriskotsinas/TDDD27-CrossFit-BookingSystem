import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../../models/user';
import { registerValidation } from '../../validation';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Account with that email already exists');

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
    const savedUser = await user.save();
    return res.send(savedUser);
  } catch (err) {
    console.log('hello');
    return res.status(400).send(err);
  }
});

export default router;
