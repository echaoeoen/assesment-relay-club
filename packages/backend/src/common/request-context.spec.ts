import User from 'src/user/entity/user.entity';
import { RequestContext } from './request-context';
import awaitToError from './await-to-error';

describe('src/common/request-context.ts', () => {
  describe('startContext()', () => {
    it(`should start a new context request flow when function triggered`, async () => {
      const data = await RequestContext.startContext(async () => {
        const contextData = RequestContext.asyncLocalStorage.getStore();
        expect(contextData).toBeDefined();
        return 'passed context';
      });
      expect(data).toBe('passed context');
    });
  });
  describe('setContext()', () => {
    async function notContext() {
      RequestContext.setContext({
        user: new User(),
      });
      return true;
    }
    it(`should throw error when set context triggered outside request context flow`, async () => {
      const [err, result] = await awaitToError(notContext());
      expect(result).toBeNull();
      expect(err).toBeDefined();
      expect(err.message).toBe('no active context');
    });
    it(`should success when set context triggered inside request context flow`, async () => {
      const contexted = RequestContext.startContext(notContext);
      const [err, result] = await awaitToError(contexted);
      expect(result).toBe(true);
      expect(err).toBeNull();
    });
  });
  describe('getContext()', () => {
    async function notContext() {
      RequestContext.setContext({
        user: {
          id: 1,
          name: 'some-name',
        } as User,
      });
      return true;
    }
    it(`should return empty object when get context triggered outside request context flow`, async () => {
      async function anotherFunction() {
        await notContext();
        const contextValue = RequestContext.getContext();
        expect(contextValue).toBe({});
      }
      await awaitToError(anotherFunction());
    });
    it(`should return context value when get context triggered inside request context flow`, async () => {
      async function anotherFunction() {
        await notContext();
        const contextValue = RequestContext.getContext();
        expect(contextValue.user?.id).toBe(1);
        expect(contextValue.user?.name).toBe('some name');
      }
      await awaitToError(RequestContext.startContext(anotherFunction));
    });
  });
});
