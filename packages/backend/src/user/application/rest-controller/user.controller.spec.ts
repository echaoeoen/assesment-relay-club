import { Test, TestingModule } from '@nestjs/testing';
import UserService from '../../domain/user.service';
import { UserLoginRequest, UserRegisterRequest } from './user-request';
import SessionData from 'src/common/session';
import User from '../../entity/user.entity';
import UserController from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let mockUserService: Partial<UserService>;

  beforeEach(async () => {
    mockUserService = {
      login: jest.fn(),
      register: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('login', () => {
    it('should successfully login a user', async () => {
      const mockUser = {
        id: 1,
        username: 'testuser',
        name: 'some name',
      } as User;
      const mockSession: SessionData = { user: null };
      const request: UserLoginRequest = {
        username: 'testuser',
        password: 'password',
      };

      jest.spyOn(mockUserService, 'login').mockResolvedValue(mockUser);

      const response = await userController.login(request, mockSession);

      expect(mockUserService.login).toHaveBeenCalledWith(
        'testuser',
        'password',
      );
      expect(mockSession.user).toEqual(mockUser);
      expect(response).toEqual({ message: 'success' });
    });
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
      const request: UserRegisterRequest = Object.assign(
        new UserRegisterRequest(),
        {
          username: 'newuser',
          password: 'newpassword',
          name: 'new name',
        },
      );

      await userController.register(request);

      expect(mockUserService.register).toHaveBeenCalledWith(
        request.toUserEntity(),
      );
    });
  });
});
