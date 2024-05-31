import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { create, findOne, remove, update } from './user-profiles.service';

export const createUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const { id } = req.jwtPayload;

  try {
    const profile = await create(body, id);
    return res.success(StatusCodes.CREATED, 'Created user profile successfully', profile);
  } catch (error) {
    return next(error);
  }
};

export const findUserProfileById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const profile = await findOne({ id, isActive: true }, ['user']);
    return res.success(StatusCodes.OK, 'User profile found', profile);
  } catch (error) {
    return next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, displayName, bio, yob } = req.body;
  const { id } = req.jwtPayload;

  try {
    const profile = await findOne({ isActive: true, user: { id } });

    profile.fullName = fullName;
    profile.displayName = displayName;
    profile.bio = bio;
    profile.yob = yob;
    const newProfile = await update(profile);

    return res.success(StatusCodes.OK, 'Updated bio successfully', newProfile);
  } catch (error) {
    return next(error);
  }
};

export const deleteUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await remove(id);
    return res.success(StatusCodes.OK, 'Deleted user profile successfully');
  } catch (error) {
    return next(error);
  }
};
