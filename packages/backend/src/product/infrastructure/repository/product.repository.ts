import BaseRepository from 'src/database/infrastructure/base.repository';
import Product from '../../entity/product.entity';
import { CustomRepository } from 'src/database/decorator/custom-repository';
@CustomRepository(Product)
export default class ProductRepository extends BaseRepository<Product> {}
