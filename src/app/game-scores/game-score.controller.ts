import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { create, findOne, remove, update } from './game-score.service';

export const createGameScore = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const { id } = req.jwtPayload;

  try {
    const gameScore = await create(body, id);
    return res.success(StatusCodes.CREATED, 'Created game score successfully', gameScore);
  } catch (error) {
    return next(error);
  }
};

export const findGameScoreById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const gameScore = await findOne({ id, isActive: true }, ['user', 'game']);
    return res.success(StatusCodes.OK, `Game score found`, gameScore);
  } catch (error) {
    return next(error);
  }
};

export const updateGameScore = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { score } = req.body;

  try {
    const gameScore = await findOne({ id, isActive: true });

    gameScore.score = score;
    await update(gameScore);

    return res.success(StatusCodes.OK, 'Updated game score successfully', gameScore);
  } catch (error) {
    return next(error);
  }
};

export const deleteGameScore = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await remove(id);
    return res.success(StatusCodes.OK, 'Deleted game score successfully');
  } catch (error) {
    return next(error);
  }
};
