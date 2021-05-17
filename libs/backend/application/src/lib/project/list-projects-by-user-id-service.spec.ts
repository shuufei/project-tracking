import {
  mockListProjectsResponse,
  MockProjectRepository,
} from '@bison/backend/domain';
import { createId } from '@bison/shared/domain';
import { ListProjectsByUserIdService } from './list-projects-by-user-id-service';

describe('ListProjectsByUserIdService', () => {
  let service: ListProjectsByUserIdService;
  const repository = new MockProjectRepository();

  beforeEach(() => {
    service = new ListProjectsByUserIdService(repository);
  });

  describe('正常系', () => {
    const userId = createId();

    beforeEach(() => {
      jest.spyOn(repository, 'listByUserId');
    });

    test('project一覧を取得できる', async () => {
      const response = await service.handle(userId);
      expect(response).toEqual(mockListProjectsResponse);
    });

    test('指定したuserIdで、ProjectRepositoryからproject一覧取得が行われる', async () => {
      await service.handle(userId);
      expect(repository.listByUserId).toHaveBeenCalledWith(userId);
    });
  });
});
