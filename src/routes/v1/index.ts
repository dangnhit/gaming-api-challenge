import { Router } from 'express';

import auth from './auth';
import gameScores from './game-scores';
import games from './games';
import profiles from './profiles';
import userItems from './user-items';
import users from './users';
import virtualItems from './virtual-items';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/profiles', profiles);
router.use('/games', games);
router.use('/virtual-items', virtualItems);
router.use('/user-items', userItems);
router.use('/game-scores', gameScores);

export default router;
