import { CreateUserProfileDto } from 'dto/user-profiles';
import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from 'orm/connection';
import { User, UserProfile } from 'orm/entities';
import { FindOptionsWhere } from 'typeorm';
import { AppError, NotFoundError } from 'utils/response';
import { Relation } from 'utils/types';

const userProfileRepository = AppDataSource.getRepository(UserProfile);
const useRepository = AppDataSource.getRepository(User);

export const create = async ({ fullName, displayName, bio, yob }: CreateUserProfileDto, userId: string) => {
  const user = await useRepository.findOne({ where: { id: userId, isActive: true } });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  const profile = await userProfileRepository.findOne({ where: { user: { id: userId }, isActive: true } });
  if (profile) {
    throw new AppError(`User profile already exists`, StatusCodes.CONFLICT);
  }

  const newProfile = new UserProfile();
  newProfile.fullName = fullName;
  newProfile.displayName = displayName;
  newProfile.bio = bio;
  newProfile.yob = yob;
  newProfile.createdAt = newProfile.generateDateNow();
  newProfile.updatedAt = newProfile.generateDateNow();
  newProfile.user = user;

  return await userProfileRepository.save(newProfile);
};

export const findOne = async (
  where: FindOptionsWhere<UserProfile>[] | FindOptionsWhere<UserProfile>,
  relations?: Relation[],
) => {
  const profile = await userProfileRepository.findOne({ where, relations });

  if (!profile) {
    throw new NotFoundError('User profile not found');
  }

  return profile;
};

export const update = async (profile: UserProfile) => {
  profile.updatedAt = profile.generateDateNow();
  await userProfileRepository.save(profile);
};

export const remove = async (id: string) => {
  const profile = await findOne({ id, isActive: true });

  await userProfileRepository.remove(profile);
};
