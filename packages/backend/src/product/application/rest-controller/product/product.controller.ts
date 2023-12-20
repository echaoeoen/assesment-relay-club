import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationParam } from 'src/common/pagination';
import { CreateProductRequest, UpdateProductRequest } from './product-request';
import ProductService from '../../../domain/product.service';
import { PaginatedProductResponse, ProductResponse } from './product-response';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

@Controller()
export default class ProductController {
  constructor(readonly productService: ProductService) {}
  @Post(`/api/products`)
  @HttpCode(HttpStatus.CREATED)
  @ApiExtraModels(ProductResponse)
  @ApiResponse({
    schema: { $ref: getSchemaPath(ProductResponse) },
  })
  async create(@Body() product: CreateProductRequest) {
    const created = await this.productService.create(product.toEntity());
    return created;
  }
  @Get(`/api/products`)
  @ApiExtraModels(PaginatedProductResponse)
  @ApiResponse({
    schema: { $ref: getSchemaPath(PaginatedProductResponse) },
  })
  async findAll(@Query() param: PaginationParam) {
    const data = await this.productService.findAll(param);
    return PaginatedProductResponse.fromEntity(data);
  }
  @Get(`/api/products/:id`)
  @ApiExtraModels(ProductResponse)
  @ApiResponse({
    schema: { $ref: getSchemaPath(ProductResponse) },
  })
  async findOne(@Param('id') id: number) {
    const data = await this.productService.findById(id);
    return ProductResponse.fromEntity(data);
  }
  @Put(`/api/products/:id`)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiExtraModels(ProductResponse)
  @ApiResponse({
    schema: { $ref: getSchemaPath(ProductResponse) },
  })
  async edit(@Param('id') id: number, @Body() product: UpdateProductRequest) {
    const data = await this.productService.edit(id, product.toEntity());
    return ProductResponse.fromEntity(data);
  }
  @Delete(`/api/products/:id`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    await this.productService.delete(id);
  }
}
