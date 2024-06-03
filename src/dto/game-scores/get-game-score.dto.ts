import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetGameScoreDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
