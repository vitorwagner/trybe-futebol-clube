import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';
import loginSchema from '../schema/user.joi';
import CreateError from '../utils/generateError';

const errorMap = (error: ValidationError) => {
  const { type } = error.details[0];
  switch (type) {
    case 'string.min':
      throw new CreateError(401, 'Invalid email or password');
    case 'string.email':
      throw new CreateError(401, 'Invalid email or password');
    default:
      throw new CreateError(400, 'All fields must be filled');
  }
};

const verifyLogin = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    errorMap(error);
  }
  next();
};

export default verifyLogin;
