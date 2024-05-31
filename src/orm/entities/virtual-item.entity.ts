import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { VirtualItemLevel } from 'utils/types';

import { BaseEntity } from './base.entity';
import { UserItem } from './user-item.entity';

@Entity('virtual_items')
export class VirtualItem extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Column({ type: 'boolean', nullable: false, default: false })
  @IsBoolean()
  @IsNotEmpty()
  isRarity: boolean;

  @Column({ type: 'int', nullable: false, default: 1 })
  @IsNumber()
  @IsNotEmpty()
  level: VirtualItemLevel;

  @OneToMany(() => UserItem, (userItem) => userItem.virtualItem)
  userItems: UserItem[];
}
