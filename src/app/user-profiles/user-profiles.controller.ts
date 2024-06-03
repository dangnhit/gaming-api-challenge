import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { create, findOne, findOneByUser, remove, update } from './user-profiles.service';
import { BadRequestError } from 'utils/response';
import AppStorage from 'utils/storage';

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

export const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.jwtPayload;

  try {
    const file = req.file;
    if (!file) {
      throw new BadRequestError('No filed uploaded');
    }

    const storage = new AppStorage();
    const profile = await findOneByUser(id);

    // Delete the avatar file if it exists
    await storage.del(profile.displayName);

    const path = `${profile.displayName}/${id}_${file.originalname}`;
    await storage.putBytes(path, file.buffer);

    profile.avatarUrl = path;
    await update(profile);

    return res.success(StatusCodes.OK, 'Changed avatar successfully');
  } catch (error) {
    return next(error);
  }
};
