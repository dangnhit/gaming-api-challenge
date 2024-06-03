import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetGameDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
