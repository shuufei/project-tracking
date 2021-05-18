import type { IProjectRepository, IUserRepositoy } from '@bison/backend/domain';
import { PROJECT_REPOSITORY, USER_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IGetAdminService } from './interface/get-admin-service';

export class GetAdminService implements IGetAdminService {
  constructor(
    @Inject(PROJECT_REPOSITORY) private projectRepository: IProjectRepository,
    @Inject(USER_REPOSITORY) private userRepository: IUserRepositoy
  ) {}

  async handle(
    ...args: Parameters<IGetAdminService['handle']>
  ): ReturnType<IGetAdminService['handle']> {
    const [projectId] = args;
    const project = await this.projectRepository.getById(projectId);
    return this.userRepository.getById(project.adminUserId);
  }
}
