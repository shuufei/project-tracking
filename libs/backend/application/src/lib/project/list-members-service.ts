import type { IUserRepositoy } from '@bison/backend/domain';
import { USER_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IListMembersService } from './interface/list-members-service';

export class ListMembersService implements IListMembersService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: IUserRepositoy
  ) {}

  async handle(
    ...args: Parameters<IListMembersService['handle']>
  ): ReturnType<IListMembersService['handle']> {
    const [projectId] = args;
    return this.userRepository.listByProjectId(projectId);
  }
}
