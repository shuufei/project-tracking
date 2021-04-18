import { IProjectStateQueryService } from '@bison/frontend/application';
import { IProjectDataStore } from '@bison/frontend/domain';
import { Project } from '@bison/shared/domain';
import { of } from 'rxjs';

export const mockProjects: Project[] = [
  {
    id: 'project0001',
    name: 'project 0001',
    description: 'project description',
    color: 'red',
    boards: [],
    backlog: {
      id: 'backlog0001',
      tasks: [],
      projectId: 'project0001',
    },
    members: [],
    admin: {
      id: 'user0001',
      name: 'user 0001',
      projectIds: [],
    },
  },
  {
    id: 'project0002',
    name: 'project 0002',
    description: 'project description',
    color: 'red',
    boards: [],
    backlog: {
      id: 'backlog0002',
      tasks: [],
      projectId: 'project0002',
    },
    members: [],
    admin: {
      id: 'user0002',
      name: 'user 0002',
      projectIds: [],
    },
  },
];

export class MockProjectStateQueryService implements IProjectStateQueryService {
  projects$() {
    return of(mockProjects);
  }
}

export class MockProjectDataStoreService implements IProjectDataStore {
  projects$() {
    return of(mockProjects);
  }
}
