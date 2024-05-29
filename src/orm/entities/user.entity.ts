import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', unique: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @IsNotEmpty()
  @Min(8)
  password: string;
}
