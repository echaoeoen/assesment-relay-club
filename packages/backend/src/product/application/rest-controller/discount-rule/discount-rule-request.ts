import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import DiscountRule, {
  RuleType,
} from 'src/product/entity/discount-rule.entity';

export class DicountRuleRequest {
  @ApiProperty({
    enum: Object.values(RuleType),
    description: `RuleType: ${Object.values(RuleType).join(', ')}
    * BULK_DISCOUNT: Discount applied to a product when a certain quantity is purchased
    * BUY_X_GET_Y_FREE: Buy a certain quantity of a product and get a certain quantity of same product for free
    * FREE_BUNDLE_ITEM: Buy a certain quantity of a product and get a certain quantity of another product for free`
  })
  @IsEnum(RuleType)
  ruleType: RuleType;

  @ApiProperty({
    description: `quantity of product to trigger the discount`
  })
  @Optional()
  @IsNumber()
  triggerQuantity?: number;

  @ApiProperty({
    description: `discount value, can be a number or percentage`
  })
  @Optional()
  @IsString()
  discountValue?: string;

  @ApiProperty({
    description: `product free when triggerQuantity is reached`
  })
  @Optional()
  @IsNumber()
  discountProduct?: number;

  @ApiProperty(
    {
      description: `amount of purchase to trigger the discount`
    }
  )
  @IsNumber()
  @Optional()
  minPurchaseAmount?: number;

  @ApiProperty()
  validFrom?: Date;

  @ApiProperty()
  validUntil?: Date;

  toEntity() {
    return Object.assign(new DiscountRule(), this);
  }
}
