import { ErrorRequestHandler } from 'express';

export const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  return res.status(500).json({
    error: 'an unexpected error occurred, please try again',
  });
};
