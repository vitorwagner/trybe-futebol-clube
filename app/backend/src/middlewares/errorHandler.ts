import { ErrorRequestHandler } from 'express';

export type Error = {
  status: number;
  message: string;
};

const errorHandler: ErrorRequestHandler = (error: Error, _req, res, _next) => {
  const { status, message } = error;
  return res.status(status || 500).json({ message });
};

export default errorHandler;
