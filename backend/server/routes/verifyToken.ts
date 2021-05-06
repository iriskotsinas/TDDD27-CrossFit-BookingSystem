import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface IGetUserAuthInfoRequest extends Request {
  user: any;
}

const auth = (expressRequest: Request, res: Response, next: NextFunction) => {
  const req = expressRequest as IGetUserAuthInfoRequest;

  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    if (process.env.TOKEN_SECRET) {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      return next();
    }
    return res.status(400).send('SECRET NOT FOUND');
  } catch (err) {
    return res.status(400).send('Invalid Token');
  }
};

export { auth };
