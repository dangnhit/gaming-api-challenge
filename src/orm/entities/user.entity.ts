import { IsEmail, IsNotEmpty, IsString, Length, Min } from 'class-validator';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { UserRole } from 'utils/types';
import { UserProfile } from './user-profile.entity';
import { UserItem } from './user-item.entity';
import { GameScore } from './game-score.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  @Length(8, 32)
  password: string;

  @Column({ type: 'varchar', nullable: false, default: 'user' })
  @IsString()
  role: UserRole;

  @OneToOne(() => UserProfile, (userProfile) => userProfile.user, { onDelete: 'CASCADE' })
  @JoinColumn()
  profile: UserProfile;

  @OneToMany(() => UserItem, (userItem) => userItem.user)
  userItems: UserItem[];

  @OneToMany(() => GameScore, (gameScore) => gameScore.user)
  gameScores: GameScore[];
}
