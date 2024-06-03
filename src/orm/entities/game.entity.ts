import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { GameGenre } from 'utils/types';

import { BaseEntity } from './base.entity';
import { GameScore } from './game-score.entity';

@Entity('games')
export class Game extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  genre: GameGenre;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  author: string;

  @Column({ type: 'timestamptz', nullable: false })
  @IsDate()
  @IsNotEmpty()
  releasedAt: Date;

  @OneToMany(() => GameScore, (gameScore) => gameScore.game)
  gameScores: GameScore[];
}
