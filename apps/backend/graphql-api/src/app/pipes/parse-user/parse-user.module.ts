import { GET_USER_BY_IDP_USER_ID } from '@bison/backend/application';
import { Module } from '@nestjs/common';
import { MockGetUserByIdpUserIdService } from '../../../mock/get-user-by-idp-user-id-service';
import { ParseUserPipe } from './parse-user.pipe';

const GetUserByIdpUserIdServiceProvider = {
  provide: GET_USER_BY_IDP_USER_ID,
  useClass: MockGetUserByIdpUserIdService,
};

@Module({
  providers: [ParseUserPipe, GetUserByIdpUserIdServiceProvider],
  exports: [GetUserByIdpUserIdServiceProvider],
})
export class ParseUserModule {}
