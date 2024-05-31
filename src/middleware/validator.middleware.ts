import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function validateRequest(dtoClass: any, type: 'body' | 'params' | 'query') {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObject = plainToInstance(dtoClass, req[type]);
    const errors = await validate(dtoObject);

    if (errors.length > 0) {
      const errorMessages: string[] = [];
      for (const error of errors) {
        if (error.constraints) {
          errorMessages.push(...Object.values(error.constraints));
        }
      }

      // log detailed error in development mode
      if (process.env.NODE_ENV === 'development') {
        console.error('Error: ', errorMessages);
      }

      return res.status(StatusCodes.BAD_REQUEST).json({
        status: 'fail',
        statuscode: StatusCodes.BAD_REQUEST,
        message: 'Validation failed',
        stack: errorMessages,
      });
    }
    return next();
  };
}
