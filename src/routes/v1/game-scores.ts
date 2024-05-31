import { createGameScore, deleteGameScore, findGameScoreById, updateGameScore } from 'app/game-scores';
import { CreateGameScoreDto, DeleteGameScoreDto, GetGameScoreDto, UpdateGameScoreDto } from 'dto/game-scores';
import { Router } from 'express';
import { authenticate, validateRequest } from 'middleware';

const router = Router();

router.post('/', [authenticate, validateRequest(CreateGameScoreDto, 'body')], createGameScore);
router.get('/:id', [authenticate, validateRequest(GetGameScoreDto, 'params')], findGameScoreById);
router.put(
  '/:id',
  [authenticate, validateRequest(GetGameScoreDto, 'params'), validateRequest(UpdateGameScoreDto, 'body')],
  updateGameScore,
);
router.delete('/:id', [authenticate, validateRequest(DeleteGameScoreDto, 'params')], deleteGameScore);

export default router;
