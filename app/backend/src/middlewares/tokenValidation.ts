import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/jwt.utils';

const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = validateToken(authorization);
    res.locals.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenValidation;
