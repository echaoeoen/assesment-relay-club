import { ApiProperty } from '@nestjs/swagger';
import DiscountRule, {
  RuleType,
} from 'src/product/entity/discount-rule.entity';
import { Paginated } from 'src/common/pagination';

export class DiscountRuleResponse {
  @ApiProperty()
  id: number;

  @ApiProperty({
    enum: Object.values(RuleType),
  })
  ruleType: RuleType;

  @ApiProperty()
  triggerQuantity?: number;

  @ApiProperty()
  discountValue?: string;

  @ApiProperty()
  discountProduct?: number;

  @ApiProperty()
  minPurchaseAmount?: number;

  @ApiProperty()
  validFrom?: Date;

  @ApiProperty()
  validUntil?: Date;

  static fromEntity(entity: DiscountRule) {
    return Object.assign(new DiscountRuleResponse(), entity);
  }
}

export class DiscountRulePaginatedResponse
  implements Paginated<DiscountRuleResponse>
{
  @ApiProperty()
  totalItems: number;
  @ApiProperty()
  items: DiscountRuleResponse[];
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  currentPage: number;
  static fromEntity(entity: Paginated<DiscountRule>) {
    return Object.assign(new DiscountRulePaginatedResponse(), entity);
  }
}
