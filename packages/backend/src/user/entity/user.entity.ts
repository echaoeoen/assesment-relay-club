import { hashString } from 'src/common/hash';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('user')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  @Index()
  username: string;

  @Column({
    type: 'varchar',
    length: 500,
    transformer: {
      from() {
        return ''; // hide value on reading
      },
      to(v: string) {
        return hashString(v);
      },
    },
  })
  @Index()
  password?: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;
}
