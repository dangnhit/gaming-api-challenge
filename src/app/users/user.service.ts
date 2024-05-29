import { AppDataSource } from 'orm/connection';
import { User } from 'orm/entities';
import { NotFoundError } from 'utils/response';

const userRepository = AppDataSource.getRepository(User);

export const findById = async (id: string) => {
  const user = await userRepository.findOne({ where: { id } });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
};
