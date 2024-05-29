import { findUserById } from 'app/users';
import { Router } from 'express';

const router = Router();

router.get('/:id', findUserById);

export default router;
