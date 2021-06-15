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
import type { IUpdatePrjojectService } from './update-project.service.interface';

export class UpdateProjectService implements IUpdatePrjojectService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    @Inject(CAN_EDIT_PROJECT_SERVICE)
    private readonly canEditProjectService: ICanEditProjectService
  ) {}

  async handle(
    ...args: Parameters<IUpdatePrjojectService['handle']>
  ): ReturnType<IUpdatePrjojectService['handle']> {
    const [project, user] = args;
    const canEditProject = await this.canEditProjectService.handle(
      user.id,
      project.id
    );
    if (!canEditProject) {
      throw new PermissionDeniedError();
    }
    return this.projectRepository.update(project);
  }
}
