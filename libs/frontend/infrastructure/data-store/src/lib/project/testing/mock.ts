import { Color } from '@bison/shared/schema';

export const mockProjectsQueryRresponse = {
  viewer: {
    projects: [
      {
        id: 'project0001',
        name: 'project name 0001',
        description: 'project description 0001',
        color: Color.RED,
        boards: [
          {
            id: 'board0001',
            name: 'board name 0001',
            description: 'board description 0001',
            project: {
              id: 'project515',
            },
          },
          {
            id: 'board0002',
            name: 'board name 0002',
            description: 'board description 0002',
            project: {
              id: 'project611',
            },
          },
          {
            id: 'board0003',
            name: 'board name 0003',
            description: 'board description 0003',
            project: {
              id: 'project289',
            },
          },
        ],
        members: [
          {
            id: 'user0001',
            name: 'user name 0001',
            icon: 'user description 0001',
          },
          {
            id: 'user0002',
            name: 'user name 0002',
            icon: 'user icon 0002',
          },
          {
            id: 'user0003',
            name: 'user name 0003',
            icon: 'user icon 0003',
          },
        ],
        admin: {
          id: 'admin0001',
          name: 'admin name 0001',
          icon: 'admin icon 0001',
        },
      },
      {
        id: 'project0002',
        name: 'project name 0002',
        description: 'project description 0002',
        color: Color.BLUE,
        boards: [
          {
            id: 'board0001',
            name: 'board name 0001',
            description: 'board description 0001',
            project: {
              id: 'project515',
            },
          },
          {
            id: 'board0002',
            name: 'board name 0002',
            description: 'board description 0002',
            project: {
              id: 'project611',
            },
          },
          {
            id: 'board0003',
            name: 'board name 0003',
            description: 'board description 0003',
            project: {
              id: 'project289',
            },
          },
        ],
        members: [
          {
            id: 'user0001',
            name: 'user name 0001',
            icon: 'user description 0001',
          },
          {
            id: 'user0002',
            name: 'user name 0002',
            icon: 'user icon 0002',
          },
          {
            id: 'user0003',
            name: 'user name 0003',
            icon: 'user icon 0003',
          },
        ],
        admin: {
          id: 'admin0001',
          name: 'admin name 0001',
          icon: 'admin icon 0001',
        },
      },
      {
        id: 'project0003',
        name: 'project name 0003',
        description: 'project description 0003',
        color: Color.GREEN,
        boards: [
          {
            id: 'board0001',
            name: 'board name 0001',
            description: 'board description 0001',
            project: {
              id: 'project515',
            },
          },
          {
            id: 'board0002',
            name: 'board name 0002',
            description: 'board description 0002',
            project: {
              id: 'project611',
            },
          },
          {
            id: 'board0003',
            name: 'board name 0003',
            description: 'board description 0003',
            project: {
              id: 'project289',
            },
          },
        ],
        members: [
          {
            id: 'user0001',
            name: 'user name 0001',
            icon: 'user description 0001',
          },
          {
            id: 'user0002',
            name: 'user name 0002',
            icon: 'user icon 0002',
          },
          {
            id: 'user0003',
            name: 'user name 0003',
            icon: 'user icon 0003',
          },
        ],
        admin: {
          id: 'admin0001',
          name: 'admin name 0001',
          icon: 'admin icon 0001',
        },
      },
    ],
  },
};
