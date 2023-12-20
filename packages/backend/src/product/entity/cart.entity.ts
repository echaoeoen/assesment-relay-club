import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import Product from './product.entity';
import User from 'src/user/entity/user.entity';

@Entity('cart')
@Unique(['user', 'product'])
export default class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Product)
  product: Product;

  @Column('int')
  quantity: number;
}
