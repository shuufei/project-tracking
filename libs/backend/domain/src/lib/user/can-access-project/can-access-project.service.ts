import { Inject } from '@nestjs/common';
import type { IProjectRepository } from '../../project/project-repository/project-repository.interface';
import { PROJECT_REPOSITORY } from '../../project/project-repository/project-repository.interface';
import { ICanAccessProjectService } from './can-access-project.service.interface';

export class CanAccessProjectService implements ICanAccessProjectService {
  constructor(
    @Inject(PROJECT_REPOSITORY) private projectRepository: IProjectRepository
  ) {}

  async handle(
    ...args: Parameters<ICanAccessProjectService['handle']>
  ): ReturnType<ICanAccessProjectService['handle']> {
    const [userId, projectId] = args;
    const { projects } = await this.projectRepository.listByUserId(userId);
    return projects.find((project) => project.id === projectId) !== undefined;
  }
}
