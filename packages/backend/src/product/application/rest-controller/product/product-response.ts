import { Paginated } from 'src/common/pagination';
import Product from '../../../entity/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  sku: string;
  @ApiProperty()
  price: number;
  static fromEntity(entity: Product) {
    return Object.assign(new ProductResponse(), entity);
  }
}

export class PaginatedProductResponse implements Paginated<ProductResponse> {
  @ApiProperty()
  totalItems: number;
  @ApiProperty()
  items: ProductResponse[];
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  currentPage: number;
  static fromEntity(paginated: Paginated<Product>) {
    return Object.assign(new PaginatedProductResponse(), paginated);
  }
}
