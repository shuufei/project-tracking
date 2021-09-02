import type { IUserRepository } from '@bison/backend/domain';
import { USER_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IListMembersService } from './list-members.service.interface';

export class ListMembersService implements IListMembersService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepository
  ) {}

  async handle(
    ...args: Parameters<IListMembersService['handle']>
  ): ReturnType<IListMembersService['handle']> {
    const [projectId] = args;
    return this.userRepository.listByProjectId(projectId);
  }
}
