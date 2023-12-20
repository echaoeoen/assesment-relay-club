import * as UUID from 'uuid';
import { AsyncLocalStorage } from 'async_hooks';
import { EntityManager } from 'typeorm';
import User from 'src/user/entity/user.entity';

export interface Context {
  user?: User;
  transaction?: EntityManager;
}
export class RequestContext {
  static contextMap: Map<string, Context> = new Map();
  static asyncLocalStorage = new AsyncLocalStorage<string>();
  static async startContext<T>(handler: () => void | Promise<T>) {
    const contextId = UUID.v4();
    const initialContext: Context = {
      user: null,
      transaction: null,
    };
    RequestContext.contextMap.set(contextId, initialContext);
    const res = await RequestContext.asyncLocalStorage.run(contextId, handler);
    RequestContext.contextMap.delete(contextId);
    return res as T;
  }
  static getContext(): Context {
    const id = RequestContext.asyncLocalStorage.getStore();
    return RequestContext.contextMap.get(id) || {};
  }
  static setContext(data: Partial<Context>): void {
    const id = RequestContext.asyncLocalStorage.getStore();

    if (!id) {
      throw new Error('no active context');
    }
    const context = RequestContext.getContext();
    RequestContext.contextMap.set(id, {
      ...context,
      ...data,
    });
  }
}
