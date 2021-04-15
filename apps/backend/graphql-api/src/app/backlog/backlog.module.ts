import {
  GET_PROJECT_BY_BACKLOG_ID_SERVICE,
  IGetProjectByBacklogIdService,
} from '@bison/backend/application';
import { Color } from '@bison/shared/domain';
import { Module } from '@nestjs/common';
import { getRandom } from '../util/get-random-number';
import { BacklogReolver } from './backlog.resolver';

class MockGetProjectByBacklogIdService
  implements IGetProjectByBacklogIdService {
  async handle() {
    return {
      id: `project${getRandom()}`,
      name: `project name ${getRandom()}`,
      description: `project description ${getRandom()}`,
      color: 'red' as Color,
    };
  }
}

@Module({
  providers: [
    BacklogReolver,
    {
      provide: GET_PROJECT_BY_BACKLOG_ID_SERVICE,
      useValue: new MockGetProjectByBacklogIdService(),
    },
  ],
})
export class BacklogModule {}
