import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { VirtualItemLevel } from 'utils/types';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { VirtualItem } from './virtual-item.entity';
import { Game } from './game.entity';

@Entity('game_scores')
export class GameScore extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @Column({ type: 'boolean', nullable: false, default: true })
  @IsBoolean()
  @IsNotEmpty()
  isLatest: boolean;

  @ManyToOne(() => User, (user) => user.gameScores, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Game, (game) => game.gameScores, { onDelete: 'CASCADE' })
  @JoinColumn()
  game: Game;
}
