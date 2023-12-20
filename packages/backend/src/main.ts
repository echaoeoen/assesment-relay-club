import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'cookie-session';
import { ValidationPipe } from '@nestjs/common';
import { RequestContext } from './common/request-context';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request, Response } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Relay Club assessment')
    .setDescription('Rellay club assessment swagger documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(
    session({
      name: 'session',
      keys: ['some-session-key'],

      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use((_req, _res, next) => RequestContext.startContext(next));

  app.enableCors();
  await app.listen(3001);
}
bootstrap();
