import { Module } from '@nestjs/common';
import DatabaseModule from '../database/database.module';
import ProductRepository from './infrastructure/repository/product.repository';
import DiscountRuleRepository from './infrastructure/repository/discount-rule.repository';
import DiscountRuleService from './domain/discount-rule.service';
import ProductService from './domain/product.service';
import ProductController from './application/rest-controller/product/product.controller';
import DiscountRuleController from './application/rest-controller/discount-rule/discount-rule.controller';
import CartRepository from './infrastructure/repository/cart.repository';
import CartService from './domain/cart.service';
import CartController from './application/rest-controller/cart/cart-controller';

@Module({
  imports: [
    DatabaseModule.forCustomRepository(
      ProductRepository,
      DiscountRuleRepository,
      CartRepository,
    ),
  ],
  providers: [DiscountRuleService, ProductService, CartService],
  controllers: [ProductController, DiscountRuleController, CartController],
})
export default class ProductModule {}
