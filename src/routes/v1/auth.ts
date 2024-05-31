import { changePassword, createUser, login } from 'app/users';
import { ChangePasswordDto, LoginUserDto, RegisterUserDto } from 'dto/users';
import { Router } from 'express';
import { authenticate, validateRequest } from 'middleware';

const router = Router();

router.post('/login', [validateRequest(LoginUserDto, 'body')], login);
router.post('/register', [validateRequest(RegisterUserDto, 'body')], createUser);
router.put('/password', [authenticate, validateRequest(ChangePasswordDto, 'body')], changePassword);

export default router;
