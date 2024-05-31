import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { create, findOne, remove, update } from './virtual-item.service';

export const createVirtualItem = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  try {
    const item = await create(body);
    return res.success(StatusCodes.CREATED, 'Created virtual item successfully', item);
  } catch (error) {
    return next(error);
  }
};

export const findVirtualItemById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const item = await findOne({ id, isActive: true });
    return res.success(StatusCodes.OK, `Virtual item ${item.name} found`, item);
  } catch (error) {
    return next(error);
  }
};

export const updateVirtualItem = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { name, description, isRarity, level } = req.body;

  try {
    const item = await findOne({ id, isActive: true });

    item.name = name;
    item.description = description;
    item.isRarity = isRarity;
    item.level = level;
    await update(item);

    return res.success(StatusCodes.OK, 'Updated virtual item successfully', item);
  } catch (error) {
    return next(error);
  }
};

export const deleteVirtualItem = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await remove(id);
    return res.success(StatusCodes.OK, 'Deleted virtual item successfully');
  } catch (error) {
    return next(error);
  }
};
