import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { VirtualItemLevel } from 'utils/types';

export class CreateVirtualItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isRarity: boolean;

  @IsNumber()
  @IsOptional()
  level: VirtualItemLevel;
}
