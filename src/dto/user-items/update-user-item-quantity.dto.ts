import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateUserItemQuantityDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  quantity: number;
}
