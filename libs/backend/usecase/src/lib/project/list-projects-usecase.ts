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
    count: number,
    after?: Project['id']
  ): Promise<ListProjectsResponse> {
    // 後続に取得するべき項目があるかどうかを判定するため、クライアントで指定された件数より1つ多く取得する
    const maxCount = count + 1;
    const listRes = await this.repository.list(maxCount, after);
    return {
      edges: listRes.edges,
      hasNextPage: listRes.edges.length === maxCount,
    };
  }
}
