import Checkout from 'src/product/entity/checkout.entity';
import { ProductResponse } from '../product/product-response';
import Cart from 'src/product/entity/cart.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CheckoutResponse {
  @ApiProperty()
  product: ProductResponse;
  @ApiProperty()
  price: number;
  @ApiProperty()
  discount: number;
  @ApiProperty()
  discountDescription: string;
  @ApiProperty()
  quantity: number;

  static fromEntity(entity: Checkout) {
    return Object.assign(new CheckoutResponse(), entity);
  }
}

export class CartResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  product: ProductResponse;
  @ApiProperty()
  quantity: number;
  static fromEntity(entity: Cart) {
    return Object.assign(new CartResponse(), entity);
  }
}
