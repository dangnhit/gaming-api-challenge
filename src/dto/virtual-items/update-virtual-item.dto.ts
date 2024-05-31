import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GameGenre, VirtualItemLevel } from 'utils/types';

export class UpdateVirtualItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isRarity: boolean;

  @IsDate()
  @IsOptional()
  level: VirtualItemLevel;
}
