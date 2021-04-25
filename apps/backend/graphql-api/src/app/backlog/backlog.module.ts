import { GET_PROJECT_BY_BACKLOG_ID_SERVICE } from '@bison/backend/application';
import { Module } from '@nestjs/common';
import { MockGetProjectByBacklogIdService } from '../../mock';
import { BacklogReolver } from './backlog.resolver';

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
