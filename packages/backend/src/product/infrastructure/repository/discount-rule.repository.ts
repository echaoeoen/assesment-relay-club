import BaseRepository from 'src/database/infrastructure/base.repository';
import DiscountRule, { RuleType } from '../../entity/discount-rule.entity';
import { CustomRepository } from 'src/database/decorator/custom-repository';
import { OnApplicationBootstrap } from '@nestjs/common';
import ProductRepository from './product.repository';
import Product from '../../entity/product.entity';

@CustomRepository(DiscountRule)
export default class DiscountRuleRepository
  extends BaseRepository<DiscountRule>
  implements OnApplicationBootstrap
{
  async onApplicationBootstrap() {
    // I use this function to initialize product data based on the assessment,
    const productRepo = new ProductRepository(
      Product,
      this.manager,
      this.queryRunner,
    );

    await productRepo.save([
      {
        sku: 'ipb',
        id: 1,
        name: 'Super iPad',
        price: 549.99,
      },
      {
        sku: 'mbp',
        id: 2,
        name: 'Macbook Pro',
        price: 1399.99,
      },
      {
        sku: 'atv',
        id: 3,
        name: 'Apple TV',
        price: 109.5,
      },
      {
        sku: 'vga',
        id: 4,
        name: 'VGA Adapter',
        price: 30,
      },
    ]);
    await this.save([
      {
        id: 1,
        ruleType: RuleType.BUY_X_GET_Y_FREE,
        triggerQuantity: 2,
        triggerProduct: {
          id: 3,
        },
        discountValue: 1,
        description: 'Free 1 Apple TV for buying 2 Apple TV',
      },
      {
        id: 2,
        ruleType: RuleType.BULK_DISCOUNT,
        discountValue: 499.99,
        triggerQuantity: 4,
        triggerProduct: {
          id: 2,
        },
        description: 'Get $499.99 for each Macbook Pro for buying more than 4',
      },
      {
        id: 3,
        ruleType: RuleType.FREE_BUNDLE_ITEM,
        discountProduct: {
          id: 4,
        },
        triggerProduct: {
          id: 2,
        },
        description: 'Get free VGA Adapter for each Macbook Pro',
      },
    ] as DiscountRule[]);
  }
  async getById(id: number) {
    return this.findOneOrFail({
      where: {
        id,
      },
      relations: ['triggerProduct'],
    });
  }
}
