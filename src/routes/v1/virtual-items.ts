import { createVirtualItem, deleteVirtualItem, findVirtualItemById, updateVirtualItem } from 'app/virtual-items';
import { CreateVirtualItemDto, DeleteVirtualItemDto, GetVirtualItemDto, UpdateVirtualItemDto } from 'dto/virtual-items';
import { Router } from 'express';
import { authenticate, authorize, validateRequest } from 'middleware';

const router = Router();

router.post(
  '/',
  [authenticate, authorize(['admin']), validateRequest(CreateVirtualItemDto, 'body')],
  createVirtualItem,
);
router.get(
  '/:id',
  [authenticate, authorize(['admin']), validateRequest(GetVirtualItemDto, 'params')],
  findVirtualItemById,
);
router.put(
  '/:id',
  [
    authenticate,
    authorize(['admin']),
    validateRequest(GetVirtualItemDto, 'params'),
    validateRequest(UpdateVirtualItemDto, 'body'),
  ],
  updateVirtualItem,
);
router.delete(
  '/:id',
  [authenticate, authorize(['admin']), validateRequest(DeleteVirtualItemDto, 'params')],
  deleteVirtualItem,
);

export default router;
