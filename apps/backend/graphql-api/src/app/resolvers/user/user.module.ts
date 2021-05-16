import {
  GET_ME_SERVICE,
  LIST_PROJECTS_BY_USER_ID_SERVICE,
} from '@bison/backend/application';
import { Module } from '@nestjs/common';
import { MockGetMeService } from '../../../mock';
import { MockListProjectsByUserIdService } from '../../../mock/list-projects-by-user-id-service';
import { ParseUserPipeModule } from '../../pipes/parse-user/parse-user.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [ParseUserPipeModule],
  providers: [
    UserResolver,
    {
      provide: LIST_PROJECTS_BY_USER_ID_SERVICE,
      useClass: MockListProjectsByUserIdService,
    },
    {
      provide: GET_ME_SERVICE,
      useClass: MockGetMeService,
    },
  ],
})
export class UserModule {}
