import type { IProjectRepository } from '@bison/backend/domain';
import { PROJECT_REPOSITORY } from '@bison/backend/domain';
import type { Project } from '@bison/shared/domain';
import { Inject } from '@nestjs/common';
import type {
  IListProjectsUsecase,
  ListProjectsResponse,
} from './interface/list-projects-usecase';

export class ListProjectsUsecase implements IListProjectsUsecase {
  constructor(
    @Inject(PROJECT_REPOSITORY) private repository: IProjectRepository
  ) {}

  async execute(
    first: number,
    after?: Project['id']
  ): Promise<ListProjectsResponse> {
    const listRes = await this.repository.list(first, after);
    return {
      projects: listRes.entities,
      nextCursor: listRes.nextCursor,
    };
  }
}
