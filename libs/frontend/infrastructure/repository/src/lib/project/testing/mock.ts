import { Color } from '@bison/shared/schema';
export const mockProjectsQueryRresponse = {
  projects: {
    edges: [
      {
        node: {
          id: 'project0001',
          name: 'project name 0001',
          description: 'project description 0001',
          color: Color.RED,
          boards: {
            edges: [
              {
                node: {
                  id: 'board0001',
                  name: 'board name 0001',
                  description: 'board description 0001',
                  isArchived: false,
                  project: {
                    id: 'project515',
                  },
                },
              },
              {
                node: {
                  id: 'board0002',
                  name: 'board name 0002',
                  description: 'board description 0002',
                  isArchived: false,
                  project: {
                    id: 'project611',
                  },
                },
              },
              {
                node: {
                  id: 'board0003',
                  name: 'board name 0003',
                  description: 'board description 0003',
                  isArchived: false,
                  project: {
                    id: 'project289',
                  },
                },
              },
            ],
          },
          backlog: {
            id: 'mock backlog id 0001',
            project: {
              id: 'project25',
            },
          },
          members: {
            edges: [
              {
                node: {
                  id: 'user0001',
                  name: 'user name 0001',
                  icon: 'user description 0001',
                },
              },
              {
                node: {
                  id: 'user0002',
                  name: 'user name 0002',
                  icon: 'user icon 0002',
                },
              },
              {
                node: {
                  id: 'user0003',
                  name: 'user name 0003',
                  icon: 'user icon 0003',
                },
              },
            ],
          },
          admin: {
            id: 'admin0001',
            name: 'admin name 0001',
            icon: 'admin icon 0001',
          },
        },
      },
      {
        node: {
          id: 'project0002',
          name: 'project name 0002',
          description: 'project description 0002',
          color: Color.BLUE,
          boards: {
            edges: [
              {
                node: {
                  id: 'board0001',
                  name: 'board name 0001',
                  description: 'board description 0001',
                  isArchived: false,
                  project: {
                    id: 'project660',
                  },
                },
              },
              {
                node: {
                  id: 'board0002',
                  name: 'board name 0002',
                  description: 'board description 0002',
                  isArchived: false,
                  project: {
                    id: 'project946',
                  },
                },
              },
              {
                node: {
                  id: 'board0003',
                  name: 'board name 0003',
                  description: 'board description 0003',
                  isArchived: false,
                  project: {
                    id: 'project124',
                  },
                },
              },
            ],
          },
          backlog: {
            id: 'mock backlog id 0001',
            project: {
              id: 'project607',
            },
          },
          members: {
            edges: [
              {
                node: {
                  id: 'user0001',
                  name: 'user name 0001',
                  icon: 'user description 0001',
                },
              },
              {
                node: {
                  id: 'user0002',
                  name: 'user name 0002',
                  icon: 'user icon 0002',
                },
              },
              {
                node: {
                  id: 'user0003',
                  name: 'user name 0003',
                  icon: 'user icon 0003',
                },
              },
            ],
          },
          admin: {
            id: 'admin0001',
            name: 'admin name 0001',
            icon: 'admin icon 0001',
          },
        },
      },
      {
        node: {
          id: 'project0003',
          name: 'project name 0003',
          description: 'project description 0003',
          color: Color.GREEN,
          boards: {
            edges: [
              {
                node: {
                  id: 'board0001',
                  name: 'board name 0001',
                  description: 'board description 0001',
                  isArchived: false,
                  project: {
                    id: 'project959',
                  },
                },
              },
              {
                node: {
                  id: 'board0002',
                  name: 'board name 0002',
                  description: 'board description 0002',
                  isArchived: false,
                  project: {
                    id: 'project348',
                  },
                },
              },
              {
                node: {
                  id: 'board0003',
                  name: 'board name 0003',
                  description: 'board description 0003',
                  isArchived: false,
                  project: {
                    id: 'project678',
                  },
                },
              },
            ],
          },
          backlog: {
            id: 'mock backlog id 0001',
            project: {
              id: 'project32',
            },
          },
          members: {
            edges: [
              {
                node: {
                  id: 'user0001',
                  name: 'user name 0001',
                  icon: 'user description 0001',
                },
              },
              {
                node: {
                  id: 'user0002',
                  name: 'user name 0002',
                  icon: 'user icon 0002',
                },
              },
              {
                node: {
                  id: 'user0003',
                  name: 'user name 0003',
                  icon: 'user icon 0003',
                },
              },
            ],
          },
          admin: {
            id: 'admin0001',
            name: 'admin name 0001',
            icon: 'admin icon 0001',
          },
        },
      },
    ],
  },
};
