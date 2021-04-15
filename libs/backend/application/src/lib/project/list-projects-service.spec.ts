import {
  Cursor,
  IProjectRepository,
  ListResponse,
  PROJECT_REPOSITORY,
} from '@bison/backend/domain';
import { Test, TestingModule } from '@nestjs/testing';
import { ListProjectsResponse } from './interface/list-projects-service';
import { ListProjectsService } from './list-projects-service';

const mockProjects: ListResponse = {
  edges: [
    {
      cursor: 'cursor0001',
      node: {
        id: 'project 0001',
        name: 'project 0001',
        color: 'red',
      },
    },
  ],
};

class MockProjectRepository implements IProjectRepository {
  async list(count: number, cursor?: Cursor) {
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
    const count = 10;
    const after = 'cursor';
    beforeEach(async () => {
      jest.spyOn(repository, 'list').mockResolvedValue(mockProjects);
    });
    test('countで指定した数より1件多く一覧の取得を行う(次回取得するデータがあるかどうか特定するため)', async () => {
      await service.handle(count, after);
      expect(repository.list).toHaveBeenCalledWith(count + 1, after);
    });

    test('project一覧を取得できる', async () => {
      const response = await service.handle(count);
      expect(response.edges).toEqual(mockProjects.edges);
    });

    describe('取得したprojectの件数がcountで指定した数+1と同じだった場合', () => {
      const count = 1;
      let response: ListProjectsResponse;
      beforeEach(async () => {
        jest.spyOn(repository, 'list').mockResolvedValue({
          edges: [mockProjects.edges[0], mockProjects.edges[0]],
        });
        response = await service.handle(count);
      });
      test('次回取得するデータが存在することをレスポンスから特定できる', () => {
        expect(response.hasNextPage).toBeTruthy();
      });
    });

    describe('取得したprojectの件数がcountで指定した数より異なる場合', () => {
      const count = 10;
      let response: ListProjectsResponse;
      beforeEach(async () => {
        jest.spyOn(repository, 'list').mockResolvedValue({
          edges: [mockProjects.edges[0], mockProjects.edges[0]],
        });
        response = await service.handle(count);
      });
      test('次回取得するデータが存在しないことをレスポンスから特定できる', () => {
        expect(response.hasNextPage).toBeFalsy();
      });
    });
  });
});
