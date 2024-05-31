import { CreateGameScoreDto } from 'dto/game-scores';
import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from 'orm/connection';
import { Game, GameScore, User } from 'orm/entities';
import { FindOptionsWhere } from 'typeorm';
import { AppError, NotFoundError } from 'utils/response';
import { Relation } from 'utils/types';

const gameScoreRepository = AppDataSource.getRepository(GameScore);
const userRepository = AppDataSource.getRepository(User);
const gameRepository = AppDataSource.getRepository(Game);

export const create = async ({ score, gameId }: CreateGameScoreDto, userId: string) => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new AppError('User not found', StatusCodes.CONFLICT);
  }

  const game = await gameRepository.findOne({ where: { id: gameId } });
  if (!game) {
    throw new NotFoundError('Game not found');
  }

  const gameScores = await gameScoreRepository.find({
    where: { isLatest: true, isActive: true, user: { id: userId }, game: { id: gameId } },
  });

  if (gameScores.length) {
    for (const gameScore of gameScores) {
      gameScore.isLatest = false;
      await gameScoreRepository.save(gameScore);
    }
  }

  const gameScore = new GameScore();
  gameScore.score = score;
  gameScore.isLatest = true;
  gameScore.createdAt = gameScore.generateDateNow();
  gameScore.updatedAt = gameScore.generateDateNow();
  gameScore.user = user;
  gameScore.game = game;

  return await gameScoreRepository.save(gameScore);
};

export const findOne = async (
  where: FindOptionsWhere<GameScore>[] | FindOptionsWhere<GameScore>,
  relations?: Relation[],
) => {
  const item = await gameScoreRepository.findOne({ where, relations });

  if (!item) {
    throw new NotFoundError('Game score not found');
  }

  return item;
};

export const update = async (gameScore: GameScore) => {
  gameScore.updatedAt = gameScore.generateDateNow();
  await gameScoreRepository.save(gameScore);
};

export const remove = async (id: string) => {
  const gameScore = await findOne({ id, isActive: true });

  await gameScoreRepository.remove(gameScore);
};
