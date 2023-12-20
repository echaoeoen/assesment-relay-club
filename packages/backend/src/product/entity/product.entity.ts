import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import DiscountRule from './discount-rule.entity';

@Entity('products')
export default class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  sku: string;

  @Index()
  @Column()
  name: string;

  @Column({
    name: 'price',
    type: 'double',
  })
  price: number;

  @OneToMany(() => DiscountRule, (discountRule) => discountRule.triggerProduct)
  discountRules: DiscountRule[];
}
