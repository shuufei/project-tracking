import {
  ListProjectsByUserIdService,
  LIST_PROJECTS_BY_USER_ID_SERVICE,
} from '@bison/backend/application';
import { PROJECT_REPOSITORY } from '@bison/backend/domain';
import { Module } from '@nestjs/common';
import { MockProjectRepository } from '../../../mock';
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
  ],
})
export class UserModule {}
