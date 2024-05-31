import { CreateGameDto } from 'dto/games';
import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from 'orm/connection';
import { Game } from 'orm/entities';
import { FindOptionsWhere } from 'typeorm';
import { AppError, NotFoundError } from 'utils/response';
import { Relation } from 'utils/types';

const gameRepository = AppDataSource.getRepository(Game);

export const create = async ({ name, genre, author, releasedAt }: CreateGameDto) => {
  const game = await gameRepository.findOne({ where: { name } });

  if (game) {
    throw new AppError(`Game ${name} already exists`, StatusCodes.CONFLICT);
  }

  const newGame = new Game();
  newGame.name = name;
  newGame.genre = genre;
  newGame.author = author;
  newGame.releasedAt = releasedAt;

  return await gameRepository.save(newGame);
};

export const findOne = async (where: FindOptionsWhere<Game>[] | FindOptionsWhere<Game>, relations?: Relation[]) => {
  const game = await gameRepository.findOne({ where, relations });

  if (!game) {
    throw new NotFoundError('Game not found');
  }

  return game;
};

export const update = async (game: Game) => {
  game.updatedAt = game.generateDateNow();
  await gameRepository.save(game);
};

export const remove = async (id: string) => {
  const game = await findOne({ id, isActive: true });

  await gameRepository.remove(game);
};
