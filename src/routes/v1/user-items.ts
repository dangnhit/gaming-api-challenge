import {
  createUserItem,
  deleteUserItem,
  findAllUserItems,
  findUserItemById,
  updateUserItemQuantity,
} from 'app/user-items';
import { PaginationQueryDto } from 'dto/pagination';
import { CreateUserItemDto, DeleteUserItemDto, GetUserItemDto, UpdateUserItemQuantityDto } from 'dto/user-items';
import { Router } from 'express';
import { authenticate, validateRequest } from 'middleware';

const router = Router();

router.post('/', [authenticate, validateRequest(CreateUserItemDto, 'body')], createUserItem);
router.get('/:id', [authenticate, validateRequest(GetUserItemDto, 'params')], findUserItemById);
router.get('/', [authenticate, validateRequest(PaginationQueryDto, 'query')], findAllUserItems);
router.put(
  '/:id',
  [authenticate, validateRequest(GetUserItemDto, 'params'), validateRequest(UpdateUserItemQuantityDto, 'body')],
  updateUserItemQuantity,
);
router.delete('/:id', [authenticate, validateRequest(DeleteUserItemDto, 'params')], deleteUserItem);

export default router;
