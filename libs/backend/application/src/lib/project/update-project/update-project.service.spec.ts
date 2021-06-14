import {
  MockCanEditProjectService,
  MockProjectRepository,
  mockProjectRepositoryReturnValues,
} from '@bison/backend/domain';
import { COLOR, createId, Project, User } from '@bison/shared/domain';
import { UpdateProjectService } from './update-project.service';

describe('UpdateProjectService', () => {
  let service: UpdateProjectService;
  const projectRepository = new MockProjectRepository();
  const canEditProjectService = new MockCanEditProjectService();

  beforeEach(() => {
    service = new UpdateProjectService(
      projectRepository,
      canEditProjectService
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('正常系', () => {
    const user: User = {
      id: createId(),
      name: 'user0001',
    };
    const project: Project = {
      id: createId(),
      name: 'project name 0001',
      color: COLOR.Blue,
      adminUserId: user.id,
    };
    describe('ユーザに編集権限があるとき', () => {
      beforeEach(() => {
        jest.spyOn(projectRepository, 'update');
      });
      test('projectの更新が行われる', async () => {
        await service.handle(project, user);
        expect(projectRepository.update).toHaveBeenCalledWith(project);
      });
      test('更新後のprojectを返す', async () => {
        const actual = await service.handle(project, user);
        expect(actual).toEqual(mockProjectRepositoryReturnValues.update);
      });
    });
  });

  describe('異常系', () => {
    const user: User = {
      id: createId(),
      name: 'user0001',
    };
    const project: Project = {
      id: createId(),
      name: 'project name 0001',
      color: COLOR.Blue,
      adminUserId: user.id,
    };
    describe('ユーザに編集権限がないとき', () => {
      beforeEach(() => {
        jest.spyOn(projectRepository, 'update');
        jest.spyOn(canEditProjectService, 'handle').mockResolvedValue(false);
      });
      test('projectの更新が行われない', async () => {
        try {
          await service.handle(project, user);
        } catch (error) {
          expect(projectRepository.update).not.toHaveBeenCalled();
        }
      });
    });
  });
});
