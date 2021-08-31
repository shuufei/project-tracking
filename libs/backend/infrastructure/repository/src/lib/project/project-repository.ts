import {
  IProjectRepository,
  mockProjectRepositoryReturnValues,
} from '@bison/backend/domain';

export class ProjectRepository implements IProjectRepository {
  async getById(
    ...args: Parameters<IProjectRepository['getById']>
  ): ReturnType<IProjectRepository['getById']> {
    return mockProjectRepositoryReturnValues.getById;
  }

  async list(
    ...args: Parameters<IProjectRepository['list']>
  ): ReturnType<IProjectRepository['list']> {
    return mockProjectRepositoryReturnValues.list;
  }

  async listByUserId(
    ...args: Parameters<IProjectRepository['listByUserId']>
  ): ReturnType<IProjectRepository['listByUserId']> {
    return mockProjectRepositoryReturnValues.listByUserId;
  }

  async create(
    ...args: Parameters<IProjectRepository['create']>
  ): ReturnType<IProjectRepository['create']> {
    return mockProjectRepositoryReturnValues.create;
  }

  async update(
    ...args: Parameters<IProjectRepository['update']>
  ): ReturnType<IProjectRepository['update']> {
    return mockProjectRepositoryReturnValues.update;
  }

  async delete(
    ...args: Parameters<IProjectRepository['delete']>
  ): ReturnType<IProjectRepository['delete']> {
    return mockProjectRepositoryReturnValues.delete;
  }

  async addMembers(
    ...args: Parameters<IProjectRepository['addMembers']>
  ): ReturnType<IProjectRepository['addMembers']> {
    return mockProjectRepositoryReturnValues.addMembers;
  }

  async removeMembers(
    ...args: Parameters<IProjectRepository['removeMembers']>
  ): ReturnType<IProjectRepository['removeMembers']> {
    return mockProjectRepositoryReturnValues.removeMembers;
  }
}
