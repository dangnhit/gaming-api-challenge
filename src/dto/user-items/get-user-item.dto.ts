import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetUserItemDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
