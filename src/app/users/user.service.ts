import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from 'orm/connection';
import { User } from 'orm/entities';
import { FindOptionsWhere } from 'typeorm';
import { AppError, NotFoundError } from 'utils/response';
import { Relation } from 'utils/types';

const userRepository = AppDataSource.getRepository(User);

export const create = async (email: string, password: string) => {
  const user = await userRepository.findOne({ where: { email } });

  if (user) {
    throw new AppError(`Email ${email} already exists`, StatusCodes.CONFLICT);
  }

  const newUser = new User();
  newUser.email = email;
  newUser.password = newUser.generatePasswordHash(password);
  newUser.createdAt = newUser.generateDateNow();
  newUser.updatedAt = newUser.generateDateNow();

  return await userRepository.save(newUser);
};

export const findOne = async (where: FindOptionsWhere<User>[] | FindOptionsWhere<User>, relations?: Relation[]) => {
  const user = await userRepository.findOne({ where, relations });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};

export const update = async (user: User) => {
  user.updatedAt = user.generateDateNow();
  await userRepository.save(user);
};

export const remove = async (id: string) => {
  const user = await findOne({ id, isActive: true });

  await userRepository.remove(user);
};
