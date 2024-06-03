import { IsEmail, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @Length(8, 32, { message: 'oldPassword must be between 8 and 32 characters' })
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @Length(8, 32, { message: 'newPassword must be between 8 and 32 characters' })
  @IsNotEmpty()
  newPassword: string;
}
