import {
  GET_PROJECT_BY_BOARD_ID_SERVICE,
  IGetProjectByBoardIdService,
} from '@bison/backend/application';
import { Color } from '@bison/shared/domain';
import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';

const getRandom = () => Math.floor(Math.random() * 1000);

class MockGetProjectByBoardId implements IGetProjectByBoardIdService {
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
      useValue: new MockGetProjectByBoardId(),
    },
  ],
})
export class BoardModule {}
