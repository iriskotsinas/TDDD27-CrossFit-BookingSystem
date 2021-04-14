import express, {Request, Response} from 'express'
import bcrypt from "bcrypt";
import { User } from '../../models/user'
import { loginValidation } from '../../validation';
const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {

  const {error} = loginValidation(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send("Incorrect account details");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if(!validPass) return res.status(400).send("Incorrect account details");

  res.send('Logged in!');
});


export default router;