import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateUserItemDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsUUID()
  @IsNotEmpty()
  virtualItemId: string;
}
