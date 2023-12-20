import BaseRepository from 'src/database/infrastructure/base.repository';
import User from '../../entity/user.entity';
import awaitToError from 'src/common/await-to-error';
import { NotFoundException } from '@nestjs/common';
import { CustomRepository } from 'src/database/decorator/custom-repository';
@CustomRepository(User)
export default class UserRepository extends BaseRepository<User> {
  async getByUsernamePassword(username: string, password: string) {
    const [err, data] = await awaitToError(
      this.findOneOrFail({
        where: {
          username,
          password,
        },
      }),
    );
    if (err) {
      if (err.message.includes('no'))
        throw new NotFoundException(`Wrong username or password`);
      throw err;
    }
    return data;
  }
  async getByUsername(username: string) {
    const [err, data] = await awaitToError(
      this.findOneOrFail({
        where: {
          username,
        },
      }),
    );
    if (err) {
      if (err.message.includes('no'))
        throw new NotFoundException(`User does not exists`);
      throw err;
    }
    return data;
  }
}
