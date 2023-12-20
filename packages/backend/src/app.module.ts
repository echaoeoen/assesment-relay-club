import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import DatabaseModule from './database/database.module';
import ProductModule from './product/product.module';
import { getConfigModule } from './config';
import UserModule from './user/user.module';
import { SessionMiddleware } from './user/application/middleware/session.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'public'),
    }),

    getConfigModule(),
    DatabaseModule.forRoot(),
    ProductModule,
    UserModule.forRoot(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .exclude(
        {
          path: '/api/login',
          method: RequestMethod.POST,
        },
        {
          path: '/api/users',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('/api/*'); // Apply for all routes or specify routes
  }
}
