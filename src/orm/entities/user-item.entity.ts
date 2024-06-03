import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { VirtualItemLevel } from 'utils/types';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { VirtualItem } from './virtual-item.entity';

@Entity('user_items')
export class UserItem extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ManyToOne(() => User, (user) => user.userItems, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => VirtualItem, (virtualItem) => virtualItem.userItems, { onDelete: 'CASCADE' })
  @JoinColumn()
  virtualItem: VirtualItem;
}
