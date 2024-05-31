import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteUserProfileDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
