import {
  MockProjectRepository,
  mockProjectRepositoryReturnValues,
  PROJECT_REPOSITORY,
} from '@bison/backend/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { ListProjectsService } from './list-projects-service';

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
    beforeEach(() => {
      jest.spyOn(repository, 'list');
    });

    test('project一覧を取得できる', async () => {
      const response = await service.handle();
      expect(response).toEqual(mockProjectRepositoryReturnValues.list);
    });

    test('ProjectRepositoryからproject一覧が取得される', async () => {
      await service.handle();
      expect(repository.list).toHaveBeenCalled();
    });
  });
});
