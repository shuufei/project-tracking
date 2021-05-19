import {
  MockBoardRepository,
  mockBoardRepositoryReturnValues,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { ListBoardsByProjectIdService } from './list-boards-by-project-id.service';

describe('ListBoadsByProjectIdService', () => {
  let service: ListBoardsByProjectIdService;
  const boardRepository = new MockBoardRepository();

  beforeEach(() => {
    service = new ListBoardsByProjectIdService(boardRepository);
  });

  describe('正常系', () => {
    const projectId = createId();

    beforeEach(() => {
      jest.spyOn(boardRepository, 'listByProjectId');
    });

    test('board一覧を取得できる', async () => {
      const response = await service.handle(projectId);
      expect(response).toEqual(mockBoardRepositoryReturnValues.listByProjectId);
    });

    test('指定したprojectIdで、BoardRepositoryから一覧取得が行われる', async () => {
      await service.handle(projectId);
      expect(boardRepository.listByProjectId).toHaveBeenCalledWith(projectId);
    });
  });
});
