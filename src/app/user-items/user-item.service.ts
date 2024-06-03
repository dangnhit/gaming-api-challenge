import { PaginationQueryDto } from 'dto/pagination';
import { CreateUserItemDto } from 'dto/user-items';
import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from 'orm/connection';
import { User, UserItem, VirtualItem } from 'orm/entities';
import { FindOptionsWhere } from 'typeorm';
import { AppError, NotFoundError } from 'utils/response';
import { Relation } from 'utils/types';

const userItemRepository = AppDataSource.getRepository(UserItem);
const userRepository = AppDataSource.getRepository(User);
const virtualItemRepository = AppDataSource.getRepository(VirtualItem);

export const create = async ({ quantity, virtualItemId }: CreateUserItemDto, userId: string) => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new AppError('User not found', StatusCodes.CONFLICT);
  }

  const virtualItem = await virtualItemRepository.findOne({ where: { id: virtualItemId } });
  if (!virtualItem) {
    throw new NotFoundError('Virtual item not found');
  }

  const item = await userItemRepository.findOne({
    where: { user: { id: userId }, virtualItem: { id: virtualItemId }, isActive: true },
  });

  if (item) {
    item.quantity = item.quantity + quantity;
    return await userItemRepository.save(item);
  }

  const newItem = new UserItem();
  newItem.quantity = quantity;
  newItem.user = user;
  newItem.virtualItem = virtualItem;
  newItem.createdAt = newItem.generateDateNow();
  newItem.updatedAt = newItem.generateDateNow();

  return await userItemRepository.save(newItem);
};

export const findOne = async (
  where: FindOptionsWhere<VirtualItem>[] | FindOptionsWhere<VirtualItem>,
  relations?: Relation[],
) => {
  const item = await userItemRepository.findOne({ where, relations });

  if (!item) {
    throw new NotFoundError('User item not found');
  }

  return item;
};

export const update = async (item: UserItem) => {
  item.updatedAt = item.generateDateNow();
  await userItemRepository.save(item);
};

export const remove = async (id: string) => {
  const item = await findOne({ id, isActive: true });

  await userItemRepository.remove(item);
};

export const find = async (dto: PaginationQueryDto, userId: string) => {
  const page = parseInt(dto.currentPage as string) || 1;
  const limit = parseInt(dto.limit as string) || 10;
  const offset = (page - 1) * limit;

  const [users, total] = await userItemRepository.findAndCount({
    where: {
      user: {
        id: userId,
      },
    },
    take: limit,
    skip: offset,
    order: {
      [dto.sortBy]: dto.orderBy,
    },
  });

  return { users, total };
};
