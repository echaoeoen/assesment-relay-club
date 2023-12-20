import { IsNumber, IsString } from 'class-validator';
import Product from '../../../entity/product.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequest {
  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  name: string;

  toEntity() {
    return Object.assign(new Product(), this);
  }
}

export class UpdateProductRequest {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  toEntity() {
    return Object.assign(new Product(), this);
  }
}
