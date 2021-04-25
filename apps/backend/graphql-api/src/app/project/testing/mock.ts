import {
  GetAdminResponse,
  GetBacklogByProjectIdResponse,
  IGetAdminService,
  IGetBacklogByProjectIdService,
  IListBoardsByProjectIdService,
  IListMembersService,
  IListProjectsService,
  ListBoardsByProjectIdResponse,
  ListMembersResponse,
  ListProjectsResponse,
} from '@bison/backend/application';
import { IProjectRepository } from '@bison/backend/domain';
import { Color } from '@bison/shared/domain';

export const mockListProjectsResponse: ListProjectsResponse = {
  projects: [
    {
      id: `project0001`,
      name: `project name 0001`,
      description: `project description 0001`,
      color: 'red' as Color,
    },
    {
      id: `project0002`,
      name: `project name 0002`,
      description: `project description 0002`,
      color: 'blue' as Color,
    },
    {
      id: `project0003`,
      name: `project name 0003`,
      description: `project description 0003`,
      color: 'green' as Color,
    },
  ],
};

export const getBacklogByProjectIdResponse: GetBacklogByProjectIdResponse = {
  id: `mock backlog id 0001`,
};

export const listBoardsByProjectIdResponse: ListBoardsByProjectIdResponse = {
  boards: [
    {
      id: `board0001`,
      name: `board name 0001`,
      description: `board description 0001`,
      isArchived: false,
    },
    {
      id: `board0002`,
      name: `board name 0002`,
      description: `board description 0002`,
      isArchived: false,
    },
    {
      id: `board0003`,
      name: `board name 0003`,
      description: `board description 0003`,
      isArchived: false,
    },
  ],
};

export const listMembersResponse: ListMembersResponse = {
  edges: [
    {
      cursor: 'user_cursor_0001',
      node: {
        id: `user0001`,
        name: `user name 0001`,
        icon: `user description 0001`,
      },
    },
    {
      cursor: 'user_cursor_0002',
      node: {
        id: `user0002`,
        name: `user name 0002`,
        icon: `user icon 0002`,
      },
    },
    {
      cursor: 'user_cursor_0003',
      node: {
        id: `user0003`,
        name: `user name 0003`,
        icon: `user icon 0003`,
      },
    },
  ],
  hasNextPage: false,
};

export const getAdminResponse: GetAdminResponse = {
  id: 'admin0001',
  name: 'admin name 0001',
  icon: 'admin icon 0001',
};

export class MockProjectRepository implements IProjectRepository {
  async list() {
    return mockListProjectsResponse;
  }
}

export class MockListProjectsService implements IListProjectsService {
  async handle() {
    return mockListProjectsResponse;
  }
}

export class MockGetBacklogByProjectIdService
  implements IGetBacklogByProjectIdService {
  async handle() {
    return getBacklogByProjectIdResponse;
  }
}

export class MockListBoardsByProjectIdService
  implements IListBoardsByProjectIdService {
  async handle() {
    return listBoardsByProjectIdResponse;
  }
}

export class MockListMembersService implements IListMembersService {
  async handle() {
    return listMembersResponse;
  }
}

export class MockGetAdminService implements IGetAdminService {
  async handle() {
    return getAdminResponse;
  }
}
