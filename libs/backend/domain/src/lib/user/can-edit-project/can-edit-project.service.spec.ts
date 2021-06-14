import { createId } from '@bison/shared/domain';
import {
  MockProjectRepository,
  mockProjectRepositoryReturnValues,
} from '../../project/project-repository/project-repository.mock';
import { CanEditProjectService } from './can-edit-project.service';
describe('CanEditProjectService', () => {
  let service: CanEditProjectService;
  const projectRepository = new MockProjectRepository();

  beforeEach(() => {
    service = new CanEditProjectService(projectRepository);
  });

  describe('指定されたuserがprojectの管理者になっているとき', () => {
    const userId = createId();
    const projectId = createId();

    beforeEach(() => {
      jest.spyOn(projectRepository, 'getById').mockResolvedValue({
        ...mockProjectRepositoryReturnValues.getById,
        id: projectId,
        adminUserId: userId,
      });
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test('trueが返る', async () => {
      const actual = await service.handle(userId, projectId);
      expect(actual).toBe(true);
    });
  });

  describe('指定されたuserがprojectの管理者になっていないとき', () => {
    const userId = createId();
    const projectId = createId();

    beforeEach(() => {
      jest.spyOn(projectRepository, 'getById').mockResolvedValue({
        ...mockProjectRepositoryReturnValues.getById,
        id: createId(),
        adminUserId: createId(),
      });
    });

    test('falseが返る', async () => {
      const actual = await service.handle(userId, projectId);
      expect(actual).toBe(false);
    });
  });
});
