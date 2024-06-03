import { StatusCodes } from 'http-status-codes';

class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, StatusCodes.NOT_FOUND);
  }
}

class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export { AppError, NotFoundError, BadRequestError };
