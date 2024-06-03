import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { create, findOne, remove, update } from './game.service';

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  try {
    const user = await create(body);
    return res.success(StatusCodes.CREATED, 'Created game successfully', user);
  } catch (error) {
    return next(error);
  }
};

export const findGameById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const game = await findOne({ id, isActive: true });
    return res.success(StatusCodes.OK, 'Game found', game);
  } catch (error) {
    return next(error);
  }
};

export const updateGame = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { name, genre, author, releasedAt } = req.body;

  try {
    const game = await findOne({ id, isActive: true });

    game.name = name;
    game.genre = genre;
    game.author = author;
    game.releasedAt = releasedAt;
    await update(game);

    return res.success(StatusCodes.OK, 'Updated game successfully', game);
  } catch (error) {
    return next(error);
  }
};

export const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await remove(id);
    return res.success(StatusCodes.OK, 'Deleted game successfully');
  } catch (error) {
    return next(error);
  }
};
