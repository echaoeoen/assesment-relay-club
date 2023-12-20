import { IsString } from 'class-validator';
import User from '../../entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginRequest {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class UserRegisterRequest extends UserLoginRequest {
  @ApiProperty()
  @IsString()
  name: string;

  toUserEntity(): User {
    const user = new User();
    return Object.assign(user, this);
  }
}
