import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteGameScoreDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
