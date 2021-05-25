import type { IUserRepositoy } from '@bison/backend/domain';
import { USER_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IGetUserByIdService } from './get-user-by-id.service.interface';

export class GetUserByIdService implements IGetUserByIdService {
  constructor(
    @Inject(USER_REPOSITORY)
    private repository: IUserRepositoy
  ) {}

  async handle(
    ...args: Parameters<IGetUserByIdService['handle']>
  ): ReturnType<IGetUserByIdService['handle']> {
    const [userId] = args;
    return this.repository.getById(userId);
  }
}
