import { COLOR, createId } from '@bison/shared/domain';
import { MockProjectRepository } from '../../project/project-repository/project-repository.mock';
import { CanAccessProjectService } from './can-access-project.service';
describe('CanAccessProjectService', () => {
  let service: CanAccessProjectService;
  const projectRepository = new MockProjectRepository();

  beforeEach(() => {
    service = new CanAccessProjectService(projectRepository);
  });

  describe('正常系', () => {
    describe('ユーザに紐づくprojectに、指定されたprojectが含まれていない時', () => {
      const userId = createId();
      const projectId = createId();

      beforeEach(() => {
        jest
          .spyOn(projectRepository, 'listByUserId')
          .mockResolvedValue({ projects: [] });
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      test('falseが返る', async () => {
        const actual = await service.handle(userId, projectId);
        expect(actual).toBe(false);
      });
    });
  });

  describe('ユーザに紐づくprojectに、指定されたprojectが含まれている時', () => {
    const userId = createId();
    const projectId = createId();

    beforeEach(() => {
      jest.spyOn(projectRepository, 'listByUserId').mockResolvedValue({
        projects: [
          {
            id: projectId,
            name: 'project name 0001',
            color: COLOR.Red,
            adminUserId: createId(),
          },
        ],
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
});
