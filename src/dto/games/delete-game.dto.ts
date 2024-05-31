import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteGameDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
