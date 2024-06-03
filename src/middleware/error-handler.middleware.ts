import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from 'utils/response';

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // log detailed error in development mode
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  // send generic message in production
  if (process.env.NODE_ENV === 'production') {
    res.status(statusCode).json({
      status: 'fail',
      statusCode,
      message: statusCode === StatusCodes.INTERNAL_SERVER_ERROR ? 'Internal Server Error' : message,
    });
  } else {
    res.status(statusCode).json({
      status: 'fail',
      statusCode,
      message,
      stack: err.stack,
    });
  }
};
