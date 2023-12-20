import { DynamicModule, Provider } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './service/typeorm-config.service';
import { DatabaseHealthcheckService } from './service/database-healthcheck.service';
import {
  BaseEntity,
  DataSource,
  EntityManager,
  EntityTarget,
  QueryRunner,
} from 'typeorm';
import BaseRepository from './infrastructure/base.repository';
import { getConfigModule } from '../config';
import { TerminusModule } from '@nestjs/terminus';
import { TYPEORM_META } from './decorator/custom-repository';

export default class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        getConfigModule(),
        TerminusModule,
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
      ],
      providers: [DatabaseHealthcheckService],
    };
  }
  public static forCustomRepository(
    ...repositories: {
      new (
        target: EntityTarget<BaseEntity>,
        manager: EntityManager,
        queryRunner: QueryRunner,
      );
    }[]
  ): DynamicModule {
    const providers: Provider[] = [];

    for (const repository of repositories) {
      const entity = Reflect.getMetadata(TYPEORM_META, repository);

      if (!entity) {
        continue;
      }

      providers.push({
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource): BaseRepository => {
          const baseRepository = dataSource.getRepository<BaseEntity>(entity);
          return new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      });
    }
    return {
      exports: providers,
      module: DatabaseModule,
      providers,
    };
  }
}
