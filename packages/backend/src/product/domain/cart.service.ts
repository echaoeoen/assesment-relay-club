import { Injectable } from '@nestjs/common';
import CartRepository from '../infrastructure/repository/cart.repository';
import { RequestContext } from 'src/common/request-context';
import ProductRepository from '../infrastructure/repository/product.repository';
import Cart from '../entity/cart.entity';
import awaitToError from 'src/common/await-to-error';
import { RuleType } from '../entity/discount-rule.entity';
import Checkout from '../entity/checkout.entity';

@Injectable()
export default class CartService {
  constructor(
    readonly cartRepository: CartRepository,
    readonly productRepository: ProductRepository,
  ) {}
  async addToCart(productId: number, quantity: number) {
    const user = RequestContext.getContext().user;
    const product = await this.productRepository.getById(productId);
    let [, cart] = await awaitToError(
      this.cartRepository.findAllByUserIdAndProductId(user.id, productId),
    );
    if (!cart) {
      cart = new Cart();
      cart.user = user;
      cart.product = product;
      cart.quantity = quantity;
    } else {
      cart.quantity += quantity;
    }
    await this.cartRepository.save(cart);
  }
  async delete(productId: number) {
    const user = RequestContext.getContext().user;
    console.log({ user });

    await this.productRepository.getById(productId);
    await this.cartRepository.delete({
      user: {
        id: user.id,
      },
      product: {
        id: productId,
      },
    });
  }

  async findAll() {
    const user = RequestContext.getContext().user;
    return this.cartRepository.findAllByUserId(user.id);
  }
  async calculateDiscount(cart: Cart, checkoutItems: Checkout[]) {
    const discounts = await Promise.all(
      cart.product.discountRules.map(
        async (
          rule,
        ): Promise<{
          discount: number;
          discountDescription: string;
        }> => {
          if (rule.ruleType === RuleType.BULK_DISCOUNT) {
            if (cart.quantity > rule.triggerQuantity) {
              return {
                discount: rule.discountValue * cart.quantity,
                discountDescription: rule.description,
              };
            }
          }
          if (rule.ruleType === RuleType.FREE_BUNDLE_ITEM) {
            if (cart.quantity >= rule.triggerQuantity) {
              if (cart.quantity <= rule.triggerQuantity + rule.discountValue) {
                cart.quantity = rule.triggerQuantity + rule.discountValue;
              }
              return {
                discount: rule.discountValue * cart.product.price,
                discountDescription: rule.description,
              };
            }
          }
          if (rule.ruleType === RuleType.BUY_X_GET_Y_FREE) {
            if (cart.quantity >= rule.triggerQuantity) {
              checkoutItems.push({
                discount: 0,
                discountDescription: rule.description,
                price: 0,
                product: rule.discountProduct,
                quantity: cart.quantity,
              });
            }
          }
        },
      ),
    );
    const checkout = discounts.reduce(
      (checkout: Checkout, current) => {
        if (!current) {
          return checkout;
        }
        checkout.discount += current.discount;
        checkout.discountDescription = `${current.discountDescription}\n`;
        checkout.price -= current.discount;
        return checkout;
      },
      {
        discount: 0,
        discountDescription: '',
        price: cart.product.price * cart.quantity,
        product: cart.product,
        quantity: cart.quantity,
      } as Checkout,
    ) as Checkout;
    checkoutItems.push(checkout);
  }
  async checkout() {
    const user = RequestContext.getContext().user;
    const cartProducts = await this.cartRepository.findAllByUserId(user.id);
    const checkoutItems: Checkout[] = [];
    await Promise.all(
      cartProducts.map((cart) => this.calculateDiscount(cart, checkoutItems)),
    );
    return checkoutItems;
  }
}
