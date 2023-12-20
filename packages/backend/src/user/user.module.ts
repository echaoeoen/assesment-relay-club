import { DynamicModule, Module } from '@nestjs/common';
import DatabaseModule from '../database/database.module';
import UserRepository from './infrastructure/repository/user.repository';
import UserController from './application/rest-controller/user.controller';
import UserService from './domain/user.service';
@Module({})
export default class UserModule {
  static forRoot(): DynamicModule {
    const providers = [UserService];
    return {
      imports: [DatabaseModule.forCustomRepository(UserRepository)],
      module: UserModule,
      controllers: [UserController],
      providers,
      exports: providers,
      global: true,
    };
  }
}
