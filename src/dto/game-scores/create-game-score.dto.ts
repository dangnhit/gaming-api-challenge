import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateGameScoreDto {
  @IsNumber()
  @IsNotEmpty()
  score: number;

  @IsUUID()
  @IsNotEmpty()
  gameId: string;
}
