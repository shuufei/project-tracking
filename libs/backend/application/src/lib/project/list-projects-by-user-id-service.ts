import type { IProjectRepository } from '@bison/backend/domain';
import { PROJECT_REPOSITORY } from '@bison/backend/domain';
import { User } from '@bison/shared/domain';
import { Inject } from '@nestjs/common';
import { IListProjectsByUserIdService } from './interface/list-projects-by-user-id-service';

export class ListProjectsByUserIdService
  implements IListProjectsByUserIdService {
  constructor(
    @Inject(PROJECT_REPOSITORY) private repository: IProjectRepository
  ) {}

  async handle(
    userId: User['id']
  ): ReturnType<IListProjectsByUserIdService['handle']> {
    return this.repository.listByUserId(userId);
  }
}
