import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import DiscountRule, {
  RuleType,
} from 'src/product/entity/discount-rule.entity';

export class DicountRuleRequest {
  @ApiProperty({
    enum: Object.values(RuleType),
  })
  @IsEnum(RuleType)
  ruleType: RuleType;

  @ApiProperty()
  @Optional()
  @IsNumber()
  triggerQuantity?: number;

  @ApiProperty()
  @Optional()
  @IsString()
  discountValue?: string;

  @ApiProperty()
  @Optional()
  @IsNumber()
  discountProduct?: number;

  @ApiProperty()
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
