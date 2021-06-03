import type {
  ICanAccessProjectService,
  IProjectRepository,
} from '@bison/backend/domain';
import {
  CAN_ACCESS_PROJECT_SERVICE,
  PROJECT_REPOSITORY,
} from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import { PermissionDeniedError } from '../../errors/permission-denied-error';
import type { IGetProjectByIdAndUserService } from './get-project-by-id-and-user.service.interface';

export class GetProjectByIdAndUserService
  implements IGetProjectByIdAndUserService {
  constructor(
    @Inject(PROJECT_REPOSITORY) private projectRepository: IProjectRepository,
    @Inject(CAN_ACCESS_PROJECT_SERVICE)
    private canAccessProjectService: ICanAccessProjectService
  ) {}

  async handle(
    ...args: Parameters<IGetProjectByIdAndUserService['handle']>
  ): ReturnType<IGetProjectByIdAndUserService['handle']> {
    const [projectId, requestUser] = args;
    const canAccessProject = await this.canAccessProjectService.handle(
      requestUser.id,
      projectId
    );
    if (!canAccessProject) {
      throw new PermissionDeniedError();
    }
    return this.projectRepository.getById(projectId);
  }
}
