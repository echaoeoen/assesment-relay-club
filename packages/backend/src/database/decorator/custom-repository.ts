import { SetMetadata } from '@nestjs/common';
import { BaseEntity } from 'typeorm';

export const TYPEORM_META = 'typeorm-database-metadata';

export function CustomRepository(repo: typeof BaseEntity): ClassDecorator {
  return SetMetadata(TYPEORM_META, repo);
}
