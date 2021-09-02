import type { IUserRepository } from '@bison/backend/domain';
import { USER_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IGetUserByIdpUserIdService } from './get-user-by-idp-user-id.service.interface';

export class GetUserByIdpUserIdService implements IGetUserByIdpUserIdService {
  constructor(
    @Inject(USER_REPOSITORY)
    private repository: IUserRepository
  ) {}

  async handle(
    idpUserId: string
  ): ReturnType<IGetUserByIdpUserIdService['handle']> {
    return this.repository.getByIdpUserId(idpUserId);
  }
}
