import {
  IProjectRepository,
  ListResponse,
  PROJECT_REPOSITORY,
} from '@bison/backend/domain';
import { COLOR } from '@bison/shared/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { ListProjectsService } from './list-projects-service';

const mockProjects: ListResponse = {
  projects: [
    {
      id: 'project 0001',
      name: 'project 0001',
      color: COLOR.Red,
    },
  ],
};

class MockProjectRepository implements IProjectRepository {
  async list() {
    return mockProjects;
  }
}

describe('ListProjectsService', () => {
  let moduleRef: TestingModule;
  let service: ListProjectsService;
  const repository = new MockProjectRepository();

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [
        ListProjectsService,
        {
          provide: PROJECT_REPOSITORY,
          useValue: repository,
        },
      ],
    }).compile();
  });

  beforeEach(() => {
    service = moduleRef.get(ListProjectsService);
  });

  describe('正常系', () => {
    beforeEach(async () => {
      jest.spyOn(repository, 'list').mockResolvedValue(mockProjects);
    });

    test('project一覧を取得できる', async () => {
      const response = await service.handle();
      expect(response.projects).toEqual(mockProjects.projects);
    });
  });
});
