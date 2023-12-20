import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Session,
} from '@nestjs/common';
import UserService from '../../domain/user.service';
import { UserLoginRequest, UserRegisterRequest } from './user-request';
import SessionData from 'src/common/session';

@Controller()
export default class UserController {
  constructor(readonly userService: UserService) {}

  @Post('/api/login')
  @HttpCode(HttpStatus.ACCEPTED)
  async login(@Body() body: UserLoginRequest, @Session() session: SessionData) {
    const data = await this.userService.login(body.username, body.password);
    session.user = data;
    return {
      message: 'success',
    };
  }

  @Post('/api/users')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: UserRegisterRequest) {
    await this.userService.register(body.toUserEntity());
  }

  @Get('/api/users/me')
  async me(@Session() session: SessionData) {
    return session.user;
  }

  @Delete('/api/logout')
  async logout(@Session() session: SessionData) {
    session.user = null;
  }
}
