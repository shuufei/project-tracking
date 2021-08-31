import type {
  ICanEditProjectService,
  IProjectRepository,
} from '@bison/backend/domain';
import {
  CAN_EDIT_PROJECT_SERVICE,
  PROJECT_REPOSITORY,
} from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import { PermissionDeniedError } from '../../errors';
import type { IDeleteProjectService } from './delete-project.service.interface';

export class DeleteProjectService implements IDeleteProjectService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    @Inject(CAN_EDIT_PROJECT_SERVICE)
    private readonly canEditProjectService: ICanEditProjectService
  ) {}

  async handle(
    ...args: Parameters<IDeleteProjectService['handle']>
  ): ReturnType<IDeleteProjectService['handle']> {
    const [projectId, user] = args;
    const canEditProject = await this.canEditProjectService.handle(
      user.id,
      projectId
    );
    if (!canEditProject) {
      throw new PermissionDeniedError();
    }
    const project = await this.projectRepository.getById(projectId);
    await this.projectRepository.delete(projectId);
    return project;
  }
}
