import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetVirtualItemDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
