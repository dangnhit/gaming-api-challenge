import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { create, findOne, remove, update } from './user.service';
import { verify } from 'password-hash';
import { BadRequestError } from 'utils/response';
import { generateToken } from 'utils/jwt';
import { JwtPayload } from 'types/JwtPayload';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await create(email, password);
    return res.success(StatusCodes.CREATED, 'Created user successfully', user);
  } catch (error) {
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await findOne({ email, isActive: true });

    if (!verify(password, user.password)) {
      throw new BadRequestError('Incorrect password');
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    try {
      const token = generateToken(jwtPayload);
      res.success(StatusCodes.OK, 'Login successfully', { token, user });
    } catch (error) {
      throw new BadRequestError('Created token failed');
    }
  } catch (error) {
    return next(error);
  }
};

export const findUserById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const user = await findOne({ id, isActive: true });
    return res.success(StatusCodes.OK, 'User found', user);
  } catch (error) {
    return next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.jwtPayload;

  try {
    const user = await findOne({ id, isActive: true });

    if (!verify(oldPassword, user.password)) {
      throw new BadRequestError('Incorrect password');
    }

    user.password = user.generatePasswordHash(newPassword);
    await update(user);

    return res.success(StatusCodes.OK, 'Change password successfully');
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await remove(id);
    return res.success(StatusCodes.OK, 'Deleted user successfully');
  } catch (error) {
    return next(error);
  }
};
