import {
  MockBoardRepository,
  mockBoardRepositoryReturnValues,
  MockProjectRepository,
  mockProjectRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { GetProjectByBoardIdService } from './get-project-by-board-id.service';

describe('GetProjectByBoardIdService', () => {
  let service: GetProjectByBoardIdService;
  const projectRepository = new MockProjectRepository();
  const boardRepository = new MockBoardRepository();

  beforeEach(() => {
    service = new GetProjectByBoardIdService(
      projectRepository,
      boardRepository
    );
  });

  describe('正常系', () => {
    const boardId = createId();

    beforeEach(() => {
      jest.spyOn(projectRepository, 'getById');
      jest.spyOn(boardRepository, 'getById');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('projectを取得できる', async () => {
      const actual = await service.handle(boardId);
      expect(actual).toEqual(mockProjectRepositoryReturnValues.getById);
    });
    test('指定したboardIdで、BoardRepositoryからboard情報取得が行われる', async () => {
      await service.handle(boardId);
      expect(boardRepository.getById).toHaveBeenCalledWith(boardId);
    });
    test('取得したboardのprojectIdで、ProjectRepositoryからproject情報取得が行われる', async () => {
      await service.handle(boardId);
      expect(projectRepository.getById).toHaveBeenCalledWith(
        mockBoardRepositoryReturnValues.getById.projectId
      );
    });
  });
});
