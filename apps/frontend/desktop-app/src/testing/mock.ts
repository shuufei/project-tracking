import { Project } from '@bison/frontend/domain';
import { COLOR, User } from '@bison/shared/domain';
export const mockProjects: Project[] = [
  {
    id: 'project0001',
    name: 'project 0001',
    description: 'project description',
    color: COLOR.Red,
    members: [],
    admin: {
      id: 'user0001',
      name: 'user 0001',
      icon: 'user icon 0001',
    },
  },
  {
    id: 'project0002',
    name: 'project 0002',
    description: 'project description',
    color: COLOR.Red,
    members: [],
    admin: {
      id: 'user0002',
      name: 'user 0002',
      icon: 'user icon 0002',
    },
  },
];

export const mockMe: User = {
  id: 'user0001',
  name: 'user name 0001',
  icon: 'user icon 0001',
};
