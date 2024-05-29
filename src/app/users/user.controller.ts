import { NextFunction, Request, Response } from 'express';

import { findById } from './user.service';

export const findUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await findById(id);
    return res.success(200, 'User found', user);
  } catch (error) {
    return next(error);
  }
};
