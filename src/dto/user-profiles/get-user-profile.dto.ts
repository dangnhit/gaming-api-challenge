import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetUserProfileDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
