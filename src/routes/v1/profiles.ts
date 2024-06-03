import {
  createUserProfile,
  deleteUserProfile,
  findUserProfileById,
  updateProfile,
  uploadAvatar,
} from 'app/user-profiles';
import { CreateUserProfileDto, DeleteUserProfileDto, GetUserProfileDto, UpdateProfileDto } from 'dto/user-profiles';
import { Router } from 'express';
import { authenticate, validateRequest } from 'middleware';
import multer from 'multer';

const router = Router();
const upload = multer();

router.post('/', [authenticate, validateRequest(CreateUserProfileDto, 'body')], createUserProfile);
router.get('/:id', [authenticate, validateRequest(GetUserProfileDto, 'params')], findUserProfileById);
router.patch('/', [authenticate, validateRequest(UpdateProfileDto, 'body')], updateProfile);
router.delete('/:id', [authenticate, validateRequest(DeleteUserProfileDto, 'params')], deleteUserProfile);
router.put('/upload', [authenticate, upload.single('file')], uploadAvatar);

export default router;
