import { CreateVirtualItemDto } from 'dto/virtual-items';
import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from 'orm/connection';
import { VirtualItem } from 'orm/entities';
import { FindOptionsWhere } from 'typeorm';
import { AppError, NotFoundError } from 'utils/response';
import { Relation } from 'utils/types';

const virtualItemRepository = AppDataSource.getRepository(VirtualItem);

export const create = async ({ name, description, isRarity, level }: CreateVirtualItemDto) => {
  const item = await virtualItemRepository.findOne({ where: { name, isActive: true } });

  if (item) {
    throw new AppError(`Virtual item ${name} already exists`, StatusCodes.CONFLICT);
  }

  const newItem = new VirtualItem();
  newItem.name = name;
  newItem.description = description;
  newItem.isRarity = isRarity;
  newItem.level = level;
  newItem.createdAt = newItem.generateDateNow();
  newItem.updatedAt = newItem.generateDateNow();

  return await virtualItemRepository.save(newItem);
};

export const findOne = async (
  where: FindOptionsWhere<VirtualItem>[] | FindOptionsWhere<VirtualItem>,
  relations?: Relation[],
) => {
  const item = await virtualItemRepository.findOne({ where, relations });

  if (!item) {
    throw new NotFoundError('Virtual item not found');
  }

  return item;
};

export const update = async (item: VirtualItem) => {
  item.updatedAt = item.generateDateNow();
  await virtualItemRepository.save(item);
};

export const remove = async (id: string) => {
  const item = await findOne({ id, isActive: true });

  await virtualItemRepository.remove(item);
};
