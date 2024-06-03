import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { create, find, findOne, remove, update } from './user-item.service';

export const createUserItem = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const { id } = req.jwtPayload;

  try {
    const item = await create(body, id);
    return res.success(StatusCodes.CREATED, 'Created user item successfully', item);
  } catch (error) {
    return next(error);
  }
};

export const findUserItemById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const item = await findOne({ id, isActive: true }, ['user', 'virtualItem']);
    return res.success(StatusCodes.OK, `User item found`, item);
  } catch (error) {
    return next(error);
  }
};

export const updateUserItemQuantity = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { quantity } = req.body;

  try {
    const item = await findOne({ id, isActive: true });

    if (quantity === 0) {
      await remove(item.id);
    } else {
      item.quantity = quantity;
      await update(item);
    }

    return res.success(StatusCodes.OK, 'Updated quantity of user item successfully', item);
  } catch (error) {
    return next(error);
  }
};

export const deleteUserItem = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    await remove(id);
    return res.success(StatusCodes.OK, 'Deleted user item successfully');
  } catch (error) {
    return next(error);
  }
};

export const findAllUserItems = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.jwtPayload;
  const query = req.query;

  try {
    const { users, total } = await find(query, id);

    return res.success(StatusCodes.OK, 'Get all users items successfully', {
      data: users,
      total,
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / parseInt(query.limit as string)),
    });
  } catch (error) {
    return next(error);
  }
};
