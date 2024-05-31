import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'types/JwtPayload';
import { generateToken } from 'utils/jwt';
import { AppError, BadRequestError } from 'utils/response';
import { UserRole } from 'utils/types';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw new BadRequestError('Authorization header not provided');
  }

  const token = authHeader.split(' ')[1];
  let jwtPayload: { [key: string]: any };
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET) as { [key: string]: any };
    ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
    req.jwtPayload = jwtPayload as JwtPayload;
  } catch (err) {
    throw new AppError('Unauthorized access', StatusCodes.UNAUTHORIZED);
  }

  try {
    // Refresh and send a new token on every request
    const newToken = generateToken(jwtPayload as JwtPayload);
    res.setHeader('token', `Bearer ${newToken}`);
    return next();
  } catch (err) {
    throw new BadRequestError(`Token can't be created`);
  }
};

export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.jwtPayload.role || !roles.includes(req.jwtPayload.role)) {
      throw new AppError('Insufficient permissions', StatusCodes.FORBIDDEN);
    }
    return next();
  };
};
