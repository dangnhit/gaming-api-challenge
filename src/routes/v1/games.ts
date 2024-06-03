import { createGame, deleteGame, findGameById, updateGame } from 'app/games';
import { CreateGameDto, DeleteGameDto, GetGameDto, UpdateGameDto } from 'dto/games';
import { Router } from 'express';
import { authenticate, authorize, validateRequest } from 'middleware';

const router = Router();

router.post('/', [authenticate, authorize(['admin']), validateRequest(CreateGameDto, 'body')], createGame);
router.get('/:id', [authenticate, authorize(['admin']), validateRequest(GetGameDto, 'params')], findGameById);
router.patch('/', [authenticate, authorize(['admin']), validateRequest(UpdateGameDto, 'body')], updateGame);
router.delete('/:id', [authenticate, authorize(['admin']), validateRequest(DeleteGameDto, 'params')], deleteGame);

export default router;
