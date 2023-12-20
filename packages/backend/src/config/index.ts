import { ConfigModule } from '@nestjs/config';

export const getConfigModule = () =>
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [
      // this docker .env will be ignored in production image
      '../../build/docker/.env',
    ],
  });
