import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { GameGenre } from 'utils/types';

export class UpdateGameDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  genre: GameGenre;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsDate()
  @IsNotEmpty()
  releasedAt: Date;
}
