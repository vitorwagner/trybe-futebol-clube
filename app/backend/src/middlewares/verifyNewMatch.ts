import { NextFunction, Request, Response } from 'express';
import CreateError from '../utils/generateError';

const verifyNewMatch = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    throw new CreateError(422, 'It is not possible to create a match with two equal teams');
  }
  next();
};

export default verifyNewMatch;
