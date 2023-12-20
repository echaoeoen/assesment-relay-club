import Product from './product.entity';

export default class Checkout {
  product: Product;
  price: number;
  discount: number;
  quantity: number;
  discountDescription: string;
}
