import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteVirtualItemDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
