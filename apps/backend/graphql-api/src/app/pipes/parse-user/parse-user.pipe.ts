import type { IGetUserByIdpUserIdService } from '@bison/backend/application';
import { GET_USER_BY_IDP_USER_ID_SERVICE } from '@bison/backend/application';
import { User } from '@bison/shared/domain';
import { Inject, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseUserPipe implements PipeTransform {
  constructor(
    @Inject(GET_USER_BY_IDP_USER_ID_SERVICE)
    private getUserByIdpUserIdService: IGetUserByIdpUserIdService
  ) {}
  transform(idpUserId: string): Promise<User> {
    return this.getUserByIdpUserIdService.handle(idpUserId);
  }
}
