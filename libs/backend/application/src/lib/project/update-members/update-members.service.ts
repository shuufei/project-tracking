import type {
  ICanEditProjectService,
  IProjectRepository,
} from '@bison/backend/domain';
import {
  CAN_EDIT_PROJECT_SERVICE,
  PROJECT_REPOSITORY,
} from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import { PermissionDeniedError } from '../../errors/permission-denied-error';
import type { IUpdateMembersService } from './update-members.service.interface';

export class UpdateMembersService implements IUpdateMembersService {
  constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectRepository: IProjectRepository,
    @Inject(CAN_EDIT_PROJECT_SERVICE)
    private readonly canEditProjectService: ICanEditProjectService
  ) {}
  async handle(
    ...args: Parameters<IUpdateMembersService['handle']>
  ): ReturnType<IUpdateMembersService['handle']> {
    const [input, user] = args;
    const canEditProject = await this.canEditProjectService.handle(
      user.id,
      input.projectId
    );
    if (!canEditProject) {
      throw new PermissionDeniedError();
    }
    await Promise.all([
      this.projectRepository.addMembers(input.projectId, input.addUserIds),
      this.projectRepository.removeMembers(
        input.projectId,
        input.removeUserIds
      ),
    ]);
    return this.projectRepository.getById(input.projectId);
  }
}
