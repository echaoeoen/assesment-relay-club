import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import UserRepository from '../infrastructure/repository/user.repository';
import User from '../entity/user.entity';
import awaitToError from 'src/common/await-to-error';

@Injectable()
export default class UserService {
  constructor(readonly userRepository: UserRepository) {}

  async login(username: string, password: string) {
    const user = await this.userRepository.getByUsernamePassword(
      username,
      password,
    );
    return user;
  }
  async register(user: User) {
    const [err] = await awaitToError(
      this.userRepository.getByUsername(user.username),
    );
    if (err) {
      if (err instanceof NotFoundException) {
        await this.userRepository.save(user);
        return;
      }
      throw err;
    }
    throw new ConflictException('Username already taken');
  }
}
