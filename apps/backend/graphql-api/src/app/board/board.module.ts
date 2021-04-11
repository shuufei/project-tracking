import {
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  IGetProjectByBoardIdService,
} from '@bison/backend/application';
import { Color } from '@bison/shared/domain';
import { Module } from '@nestjs/common';
import { getRandom } from '../util/get-random-number';
import { BoardResolver } from './board.resolver';

class MockGetProjectByBoardIdService implements IGetProjectByBoardIdService {
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
    BoardResolver,
    {
      provide: GET_PROJECT_BY_BOARD_ID_SERVICE,
      useValue: new MockGetProjectByBoardIdService(),
    },
  ],
})
export class BoardModule {}
