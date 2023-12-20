import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './product.entity';

export enum RuleType {
  BULK_DISCOUNT = 'BULK_DISCOUNT',
  BUY_X_GET_Y_FREE = 'BUY_X_GET_Y_FREE',
  FREE_BUNDLE_ITEM = 'FREE_BUNDLE_ITEM',
}

@Entity('discount_rule')
export default class DiscountRule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  triggerProduct: Product;

  @Column({
    type: 'enum',
    enum: Object.values(RuleType),
  })
  @Index()
  ruleType: RuleType;

  @Column({ nullable: true })
  triggerQuantity?: number;

  @Column({ nullable: true, type: 'double' })
  discountValue?: number;

  @ManyToOne(() => Product, { nullable: true })
  discountProduct?: Product;

  @Column({
    type: 'varchar',
    length: 1000,
  })
  description: string;

  @Column({ nullable: true })
  minPurchaseAmount?: number;

  @Column({ type: 'timestamp', nullable: true })
  validFrom?: Date;

  @Column({ type: 'timestamp', nullable: true })
  validUntil?: Date;
}
