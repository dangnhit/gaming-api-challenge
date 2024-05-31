import { IsEmail, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(8, 32, { message: 'Password must be between 8 and 32 characters' })
  @IsNotEmpty()
  password: string;
}
