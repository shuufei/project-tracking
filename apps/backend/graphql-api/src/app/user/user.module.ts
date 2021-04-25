import type { IListProjectsByUserIdService } from '@bison/backend/application';
import { LIST_PROJECTS_BY_USER_ID_SERVICE } from '@bison/backend/application';
import { Color } from '@bison/shared/domain';
import { Module } from '@nestjs/common';
import { getRandom } from '../util/get-random-number';
import { UserResolver } from './user.resolver';

class MockListProjectsByUserIdService implements IListProjectsByUserIdService {
  async handle() {
    return {
      projects: [
        {
          id: `project${getRandom()}`,
          name: `project name ${getRandom()}`,
          description: `project description ${getRandom()}`,
          color: 'red' as Color,
        },
        {
          id: `project${getRandom()}`,
          name: `project name ${getRandom()}`,
          description: `project description ${getRandom()}`,
          color: 'blue' as Color,
        },
        {
          id: `project${getRandom()}`,
          name: `project name ${getRandom()}`,
          description: `project description ${getRandom()}`,
          color: 'green' as Color,
        },
      ],
    };
  }
}

@Module({
  providers: [
    UserResolver,
    {
      provide: LIST_PROJECTS_BY_USER_ID_SERVICE,
      useValue: new MockListProjectsByUserIdService(),
    },
  ],
})
export class UserModule {}
