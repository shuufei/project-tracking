import type { IUserRepositoy } from '@bison/backend/domain';
import { USER_REPOSITORY } from '@bison/backend/domain';
import { Inject } from '@nestjs/common';
import type { IGetUserByIdpUserIdService } from './interface/get-user-by-idp-user-id-service';

export class GetUserByIdpUserIdService implements IGetUserByIdpUserIdService {
  constructor(
    @Inject(USER_REPOSITORY)
    private repository: IUserRepositoy
  ) {}

  async handle(
    idpUserId: string
  ): ReturnType<IGetUserByIdpUserIdService['handle']> {
    return this.repository.getByIdpUserId(idpUserId);
  }
}
