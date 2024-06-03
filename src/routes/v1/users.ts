import { deleteUser, findUserById } from 'app/users';
import { DeleteUserDto, GetUserDto } from 'dto/users';
import { Router } from 'express';
import { authenticate, authorize, validateRequest } from 'middleware';

const router = Router();

router.get('/:id', [authenticate, validateRequest(GetUserDto, 'params')], findUserById);
router.delete('/:id', [authenticate, authorize(['admin']), validateRequest(DeleteUserDto, 'params')], deleteUser);

export default router;
