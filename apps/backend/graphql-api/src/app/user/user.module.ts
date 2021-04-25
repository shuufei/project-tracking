import {
  GET_ME_SERVICE,
  LIST_PROJECTS_BY_USER_ID_SERVICE,
} from '@bison/backend/application';
import { Module } from '@nestjs/common';
import { MockGetMeService } from '../../mock';
import { MockListProjectsByUserIdService } from '../../mock/list-projects-by-user-id-service';
import { UserResolver } from './user.resolver';

@Module({
  providers: [
    UserResolver,
    {
      provide: LIST_PROJECTS_BY_USER_ID_SERVICE,
      useValue: new MockListProjectsByUserIdService(),
    },
    {
      provide: GET_ME_SERVICE,
      useValue: new MockGetMeService(),
    },
  ],
})
export class UserModule {}
