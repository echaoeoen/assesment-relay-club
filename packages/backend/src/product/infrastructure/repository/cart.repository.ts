import { CustomRepository } from 'src/database/decorator/custom-repository';
import Cart from '../../entity/cart.entity';
import BaseRepository from 'src/database/infrastructure/base.repository';

@CustomRepository(Cart)
export default class CartRepository extends BaseRepository<Cart> {
  findAllByUserId(userId: number) {
    return this.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: [
        'user',
        'product',
        'product.discountRules',
        'product.discountRules.discountProduct',
      ],
    });
  }
  findAllByUserIdAndProductId(userId: number, productId: number) {
    return this.findOneOrFail({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
      relations: ['user', 'product', 'product.discountRules'],
    });
  }
}
