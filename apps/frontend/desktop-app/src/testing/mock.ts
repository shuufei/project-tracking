import { Color, User } from '@bison/shared/schema';

export const mockViewer: User = {
  id: 'user0001',
  name: 'user 0001',
  projects: [
    {
      id: 'project0001',
      name: 'project 0001',
      description: 'project description',
      color: Color.BLUE,
      members: [],
      admin: {
        id: 'user0001',
        name: 'user 0001',
        icon: 'user icon 0001',
        projects: [],
      },
      boards: [],
    },
    {
      id: 'project0002',
      name: 'project 0002',
      description: 'project description',
      color: Color.RED,
      members: [],
      admin: {
        id: 'user0002',
        name: 'user 0002',
        icon: 'user icon 0002',
        projects: [],
      },
      boards: [],
    },
  ],
};
