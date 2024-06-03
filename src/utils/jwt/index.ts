import jwt from 'jsonwebtoken';
import { JwtPayload } from 'types/JwtPayload';

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
