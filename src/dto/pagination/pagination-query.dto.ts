import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PaginationQueryDto {
  @IsString()
  @IsOptional()
  limit?: string = '1';

  @IsString()
  @IsOptional()
  currentPage?: string = '10';

  @IsString()
  @IsOptional()
  sortBy?: string;

  @IsEnum(['ASC', 'DESC'])
  @IsOptional()
  orderBy?: 'DESC' | 'ASC' = 'DESC';
}
