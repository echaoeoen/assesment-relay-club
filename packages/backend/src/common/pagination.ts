import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export interface Paginated<T> {
  totalItems: number;
  items: T[];
  totalPages: number;
  currentPage: number;
}

export class PaginationParam {
  @ApiProperty({
    type: Number,
  })
  @Transform(({ value }) => (value && parseInt(value, 10)) || 1)
  page = 1;

  @ApiProperty({
    type: Number,
  })
  @Transform(({ value }) => (value && parseInt(value, 10)) || 25)
  size = 25;
}
