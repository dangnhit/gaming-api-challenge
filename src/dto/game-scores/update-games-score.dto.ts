import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateGameScoreDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  score: number;
}
