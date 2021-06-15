import {
  MockCanEditProjectService,
  MockProjectRepository,
} from '@bison/backend/domain';
import { createId, User } from '@bison/shared/domain';
import { PermissionDeniedError } from '../../errors';
import { UpdateMembersService } from './update-members.service';
import { UpdateMembersServiceInput } from './update-members.service.interface';

describe('UpdateMembersService', () => {
  let service: UpdateMembersService;
  const projectRepository = new MockProjectRepository();
  const canEditProjectService = new MockCanEditProjectService();

  beforeEach(() => {
    service = new UpdateMembersService(
      projectRepository,
      canEditProjectService
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('正常系', () => {
    const user: User = {
      id: createId(),
      name: 'user0001',
    };
    const input: UpdateMembersServiceInput = {
      projectId: createId(),
      addUserIds: [createId(), createId()],
      removeUserIds: [createId(), createId(), createId()],
    };
    describe('ユーザに編集権限があるとき', () => {
      beforeEach(() => {
        jest.spyOn(projectRepository, 'addMembers');
        jest.spyOn(projectRepository, 'removeMembers');
      });
      test('projectへのmember追加が行われる', async () => {
        await service.handle(input, user);
        expect(projectRepository.addMembers).toHaveBeenCalledWith(
          input.projectId,
          input.addUserIds
        );
      });
      test('projectからのmember削除が行われる', async () => {
        await service.handle(input, user);
        expect(projectRepository.removeMembers).toHaveBeenCalledWith(
          input.projectId,
          input.removeUserIds
        );
      });
    });
  });

  describe('異常系', () => {
    const user: User = {
      id: createId(),
      name: 'user0001',
    };
    const input: UpdateMembersServiceInput = {
      projectId: createId(),
      addUserIds: [createId(), createId()],
      removeUserIds: [createId(), createId(), createId()],
    };
    describe('ユーザに編集権限がないとき', () => {
      beforeEach(() => {
        jest.spyOn(projectRepository, 'addMembers');
        jest.spyOn(projectRepository, 'removeMembers');
        jest.spyOn(canEditProjectService, 'handle').mockResolvedValue(false);
      });
      test('projectへの追加、projectからの削除は行われない', async () => {
        try {
          await service.handle(input, user);
        } catch {
          expect(projectRepository.addMembers).not.toHaveBeenCalled();
          expect(projectRepository.removeMembers).not.toHaveBeenCalled();
        }
      });
      test('PermissionDeniedErrorをthrowする', async () => {
        await expect(service.handle(input, user)).rejects.toThrowError(
          PermissionDeniedError
        );
      });
    });
  });
});
