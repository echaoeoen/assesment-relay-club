import { NotFoundException } from '@nestjs/common';
import awaitToError from 'src/common/await-to-error';
import { Paginated, PaginationParam } from 'src/common/pagination';
import { RequestContext } from 'src/common/request-context';
import {
  BaseEntity,
  EntityManager,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  QueryRunner,
  Repository,
} from 'typeorm';

export default class BaseRepository<T = BaseEntity> extends Repository<T> {
  entityName: string;
  constructor(
    target: EntityTarget<T>,
    manager: EntityManager,
    queryRunner: QueryRunner,
  ) {
    super(target, manager, queryRunner);
    this.entityName = target.toString().split(' ')[1];
  }
  protected getRepository() {
    return RequestContext.getContext().transaction
      ? RequestContext.getContext().transaction.getRepository(this.target)
      : this;
  }
  async getPaginated(
    paginationParam: PaginationParam,
    opts: FindManyOptions<T> = {},
  ): Promise<Paginated<T>> {
    const { page, size } = paginationParam;
    opts.skip = (page - 1) * size;
    opts.take = size;
    const [items, totalItems] = await this.findAndCount(opts);
    return {
      items,
      currentPage: page,
      totalItems,
      totalPages: Math.ceil(totalItems / size),
    };
  }

  async getById(id: number) {
    return this.findOneOrFail({
      where: {
        id,
      } as unknown as FindOptionsWhere<T>,
    });
  }
  async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
    const [err, result] = await awaitToError(super.findOneOrFail(options));
    if (err) {
      if (err.message.includes('no'))
        throw new NotFoundException(`${this.entityName} does not exists`);
      throw err;
    }
    return result;
  }
}
