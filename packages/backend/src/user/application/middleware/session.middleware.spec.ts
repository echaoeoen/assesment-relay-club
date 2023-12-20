import { Response } from 'express';
import { RequestWithSession, SessionMiddleware } from './session.middleware';
import User from '../../entity/user.entity';
import { RequestContext } from 'src/common/request-context';
jest.spyOn(RequestContext, 'setContext').mockImplementation(() => {});
jest.spyOn(RequestContext, 'getContext').mockImplementation(() => ({
  user: {
    id: 1,
    name: 'some name',
    username: 'some user name',
  } as User,
}));
describe('SessionMiddleware', () => {
  let middleware: SessionMiddleware;
  let mockRequest: Partial<RequestWithSession>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    middleware = new SessionMiddleware();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    nextFunction = jest.fn();
  });

  it('should call next() if session is valid', () => {
    mockRequest = {
      session: {
        user: {
          id: 1,
          name: 'some name',
          username: 'some user name',
        } as User,
      },
    };

    middleware.use(
      mockRequest as RequestWithSession,
      mockResponse as Response,
      nextFunction,
    );
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should return 401 if session is invalid', () => {
    mockRequest = {
      session: null,
    };

    middleware.use(
      mockRequest as RequestWithSession,
      mockResponse as Response,
      nextFunction,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(401);
  });
});
