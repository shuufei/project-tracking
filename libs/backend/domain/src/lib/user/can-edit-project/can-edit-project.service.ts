import { Inject } from '@nestjs/common';
import type { IProjectRepository } from '../../project';
import { PROJECT_REPOSITORY } from '../../project';
import type { ICanEditProjectService } from './can-edit-project.service.interface';

export class CanEditProjectService implements ICanEditProjectService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository
  ) {}
  async handle(
    ...args: Parameters<ICanEditProjectService['handle']>
  ): ReturnType<ICanEditProjectService['handle']> {
    const [userId, projectId] = args;
    const project = await this.projectRepository.getById(projectId);
    return project.adminUserId === userId;
  }
}
