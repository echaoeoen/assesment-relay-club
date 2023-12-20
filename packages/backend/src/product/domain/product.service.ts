import { Injectable } from '@nestjs/common';
import ProductRepository from '../infrastructure/repository/product.repository';
import Product from '../entity/product.entity';
import { Paginated, PaginationParam } from 'src/common/pagination';

@Injectable()
export default class ProductService {
  constructor(readonly productRepository: ProductRepository) {}

  async create(product: Product) {
    return this.productRepository.save(product);
  }

  async edit(id: number, product: Product) {
    await this.productRepository.getById(id);
    return this.productRepository.save({
      id,
      ...product,
    });
  }

  async delete(id: number) {
    await this.productRepository.getById(id);
    await this.productRepository.delete(id);
  }

  async findAll(param: PaginationParam): Promise<Paginated<Product>> {
    const data = await this.productRepository.getPaginated(param);
    return data;
  }
  async findById(id: number): Promise<Product> {
    const data = await this.productRepository.getById(id);
    return data;
  }
}
