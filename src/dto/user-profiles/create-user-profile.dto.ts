import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserProfileDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  bio?: string;

  @IsNumber()
  @IsNotEmpty()
  yob: number;
}
