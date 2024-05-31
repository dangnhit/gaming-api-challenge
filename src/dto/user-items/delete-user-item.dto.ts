import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteUserItemDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
