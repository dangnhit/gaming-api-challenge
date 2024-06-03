import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('user_profiles')
export class UserProfile extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  bio?: string;

  @Column({ type: 'int', nullable: false })
  @IsString()
  @IsNotEmpty()
  yob: number;

  @Column({ type: 'varchar', nullable: true })
  @IsString()
  avatarUrl?: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
