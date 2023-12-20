import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import ProductRepository from '../infrastructure/repository/product.repository';
import { Paginated, PaginationParam } from 'src/common/pagination';
import DiscountRuleRepository from '../infrastructure/repository/discount-rule.repository';
import DiscountRule from '../entity/discount-rule.entity';

@Injectable()
export default class DiscountRuleService {
  constructor(
    readonly productRepository: ProductRepository,
    readonly discountRuleRepository: DiscountRuleRepository,
  ) {}

  async create(productId: number, discountRule: DiscountRule) {
    const product = await this.productRepository.getById(productId);
    const created = await this.discountRuleRepository.save({
      ...discountRule,
      triggerProduct: product,
    });
    return created;
  }

  async edit(productId: number, id: number, discountRule: DiscountRule) {
    const product = await this.productRepository.getById(productId);
    const discount = await this.discountRuleRepository.getById(id);
    if (discount.triggerProduct.id !== productId) {
      throw new UnprocessableEntityException(
        `this rule does not belong to product with id ${productId}`,
      );
    }
    await this.discountRuleRepository.update(id, {
      ...discountRule,
      triggerProduct: product,
    });
    return this.findById(id);
  }

  async delete(id: number) {
    await this.discountRuleRepository.delete(id);
  }

  async findAll(param: PaginationParam): Promise<Paginated<DiscountRule>> {
    const data = await this.discountRuleRepository.getPaginated(param, {
      relations: ['triggerProduct'],
    });
    return data;
  }
  async findById(id: number) {
    const rule = await this.discountRuleRepository.getById(id);
    return rule;
  }
}
