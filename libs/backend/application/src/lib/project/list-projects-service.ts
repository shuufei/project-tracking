import type { Cursor, IProjectRepository } from '@bison/backend/domain';
import { PROJECT_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import { IListProjectsService } from './interface/list-projects-service';

export class ListProjectsService implements IListProjectsService {
  constructor(
    @Inject(PROJECT_REPOSITORY) private repository: IProjectRepository
  ) {}

  async handle(
    count: number,
    after?: Cursor
  ): ReturnType<IListProjectsService['handle']> {
    // 後続に取得するべき項目があるかどうかを判定するため、クライアントで指定された件数より1つ多く取得する
    const maxCount = count + 1;
    const listRes = await this.repository.list(maxCount, after);
    return {
      edges: listRes.edges,
      hasNextPage: listRes.edges.length === maxCount,
    };
  }
}
