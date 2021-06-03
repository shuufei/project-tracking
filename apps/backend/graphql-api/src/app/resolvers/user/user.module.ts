import {
  ListProjectsByUserIdService,
  ListUsersService,
  LIST_PROJECTS_BY_USER_ID_SERVICE,
  LIST_USERS_SERVICE,
} from '@bison/backend/application';
import {
  MockProjectRepository,
  MockUserRepository,
  PROJECT_REPOSITORY,
  USER_REPOSITORY,
} from '@bison/backend/domain';
import { Module } from '@nestjs/common';
import { ParseUserPipeModule } from '../../pipes/parse-user/parse-user.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [ParseUserPipeModule],
  providers: [
    UserResolver,
    {
      provide: LIST_PROJECTS_BY_USER_ID_SERVICE,
      useClass: ListProjectsByUserIdService,
    },
    {
      provide: PROJECT_REPOSITORY,
      useClass: MockProjectRepository,
    },
    {
      provide: LIST_USERS_SERVICE,
      useClass: ListUsersService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: MockUserRepository,
    },
  ],
})
export class UserModule {}
