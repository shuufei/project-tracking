import {
  GET_ME_SERVICE,
  IGetMeService,
  IListProjectsByUserIdService,
  LIST_PROJECTS_BY_USER_ID_SERVICE,
} from '@bison/backend/application';
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

class MockGetMeService implements IGetMeService {
  async handle() {
    return {
      id: 'admin0001',
      name: 'admin name 0001',
      icon: 'admin icon 0001',
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
    {
      provide: GET_ME_SERVICE,
      useValue: new MockGetMeService(),
    },
  ],
})
export class UserModule {}
