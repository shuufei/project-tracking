import {
  GetBacklogByProjectIdResponse,
  GET_BACKLOG_BY_PROJECT_ID_SERVICE,
  IGetBacklogByProjectIdService,
  IListBoardsByProjectIdService,
  IListMembersService,
  IListProjectsService,
  ListBoardsByProjectIdResponse,
  ListMembersResponse,
  ListProjectsResponse,
  LIST_BOARDS_BY_PROJECT_ID_SERVICE,
  LIST_MEMBERS_SERVICE,
  LIST_PROJECTS_SERVICE,
} from '@bison/backend/application';
import { Color as DomainColor } from '@bison/shared/domain';
import { Color, Project } from '@bison/shared/schema';
import { Test, TestingModule } from '@nestjs/testing';
import { ProjectModule } from '../project.module';
import { ProjectResolver } from '../project.resolver';
import { listBoardsByProjectIdResponse, listMembersResponse } from './mock';

describe('ProjectResolver', () => {
  let moduleRef: TestingModule;
  let resolver: ProjectResolver;
  let listProjectsService: IListProjectsService;
  let getBacklogByProjectIdService: IGetBacklogByProjectIdService;
  let listBoardsByProjectIdService: IListBoardsByProjectIdService;
  let listMembersService: IListMembersService;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [ProjectModule],
      providers: [],
    }).compile();
  });

  beforeEach(() => {
    resolver = moduleRef.get(ProjectResolver);
    listProjectsService = moduleRef.get(LIST_PROJECTS_SERVICE);
    getBacklogByProjectIdService = moduleRef.get(
      GET_BACKLOG_BY_PROJECT_ID_SERVICE
    );
    listBoardsByProjectIdService = moduleRef.get(
      LIST_BOARDS_BY_PROJECT_ID_SERVICE
    );
    listMembersService = moduleRef.get(LIST_MEMBERS_SERVICE);
  });

  describe('projects', () => {
    describe('正常系', () => {
      const listProjectsResponse: ListProjectsResponse = {
        hasNextPage: true,
        edges: [
          {
            cursor: 'project_cursor_0001',
            node: {
              id: `project0001`,
              name: `project name 0001`,
              description: `project description 0001`,
              color: 'red' as DomainColor,
            },
          },
        ],
      };
      let projects: PromiseType<ReturnType<ProjectResolver['projects']>>;
      const first = 10;
      const after = 'id';
      beforeEach(async () => {
        jest
          .spyOn(listProjectsService, 'handle')
          .mockResolvedValue(listProjectsResponse);
        projects = await resolver.projects(first, after);
      });
      test('firstとafterをもとにApplicationServiceが呼ばれる', () => {
        expect(listProjectsService.handle).toHaveBeenCalledWith(first, after);
      });
      test('schema定義のProjectConnectionの形式でレスポンスを返す(ProjectNodeのbacklog, boards, users fieldはレスポンスに含まれない)', () => {
        expect(projects).toEqual({
          pageInfo: {
            endCursor: listProjectsResponse.edges[0].cursor,
            hasNextPage: listProjectsResponse.hasNextPage,
          },
          edges: [
            {
              cursor: listProjectsResponse.edges[0].cursor,
              node: {
                ...listProjectsResponse.edges[0].node,
                color: Color.RED,
              },
            },
          ],
        });
      });
    });

    describe('projectが1件もない時', () => {
      const listProjectsResponse: ListProjectsResponse = {
        hasNextPage: false,
        edges: [],
      };
      let projects: PromiseType<ReturnType<ProjectResolver['projects']>>;
      const first = 10;
      const after = 'id';
      beforeEach(async () => {
        jest
          .spyOn(listProjectsService, 'handle')
          .mockResolvedValue(listProjectsResponse);
        projects = await resolver.projects(first, after);
      });
      test('pageInfoのendCursorがundefinedになる', () => {
        expect(projects.pageInfo).toEqual({
          endCursor: undefined,
          hasNextPage: listProjectsResponse.hasNextPage,
        });
      });
    });
  });

  describe('backlog', () => {
    describe('正常系', () => {
      const getBacklogResponse: GetBacklogByProjectIdResponse = {
        id: 'backlog0001',
      };
      let backlog: PromiseType<ReturnType<ProjectResolver['backlog']>>;
      const project = {
        id: 'project0001',
        name: 'project0001',
        color: Color.BLUE,
      } as Project;
      beforeEach(async () => {
        jest
          .spyOn(getBacklogByProjectIdService, 'handle')
          .mockResolvedValue(getBacklogResponse);
        backlog = await resolver.backlog(project);
      });
      test('親要素のprojectのidをもとにApplicationServiceが呼ばれる', () => {
        expect(getBacklogByProjectIdService.handle).toHaveBeenCalledWith(
          project.id
        );
      });
      test('schema定義のBacklogの形式でレスポンスを返す', () => {
        expect(backlog).toEqual(backlog);
      });
    });
  });

  describe('boards', () => {
    describe('正常系', () => {
      const listBoardsResponse: ListBoardsByProjectIdResponse = {
        hasNextPage: true,
        edges: [listBoardsByProjectIdResponse.edges[0]],
      };
      let boards: PromiseType<ReturnType<ProjectResolver['boards']>>;
      const project = {
        id: 'project0001',
        name: 'project0001',
        color: Color.BLUE,
      } as Project;
      const first = 10;
      const after = 'cursor';
      beforeEach(async () => {
        jest
          .spyOn(listBoardsByProjectIdService, 'handle')
          .mockResolvedValue(listBoardsResponse);
        boards = await resolver.boards(project, first, after);
      });
      test('親要素のprojectのidとfirst, afterをもとにApplicationServiceが呼ばれる', () => {
        expect(listBoardsByProjectIdService.handle).toHaveBeenCalledWith(
          project.id,
          first,
          after
        );
      });
      test('schema定義のBoardConnectionの形式でレスポンスを返す(BoardNodeのproject fieldはレスポンスに含まれない)', () => {
        expect(boards).toEqual({
          pageInfo: {
            hasNextPage: listBoardsResponse.hasNextPage,
            endCursor: listBoardsResponse.edges[0].cursor,
          },
          edges: listBoardsResponse.edges,
        });
      });
    });

    describe('boardが1件もない時', () => {
      const listBoardsResponse: ListBoardsByProjectIdResponse = {
        hasNextPage: false,
        edges: [],
      };
      let boards: PromiseType<ReturnType<ProjectResolver['boards']>>;
      const project = {
        id: 'project0001',
        name: 'project0001',
        color: Color.BLUE,
      } as Project;
      const first = 10;
      const after = 'cursor';
      beforeEach(async () => {
        jest
          .spyOn(listBoardsByProjectIdService, 'handle')
          .mockResolvedValue(listBoardsResponse);
        boards = await resolver.boards(project, first, after);
      });
      test('pageInfoのendCursorがundefinedになる', () => {
        expect(boards.pageInfo).toEqual({
          endCursor: undefined,
          hasNextPage: false,
        });
      });
    });
  });

  describe('users', () => {
    describe('正常系', () => {
      const listMembersServiceResponse: ListMembersResponse = {
        hasNextPage: true,
        edges: [listMembersResponse.edges[0]],
      };
      let users: PromiseType<ReturnType<ProjectResolver['members']>>;
      const project = {
        id: 'project0001',
        name: 'project0001',
        color: Color.BLUE,
      } as Project;
      const first = 10;
      const after = 'cursor';
      beforeEach(async () => {
        jest
          .spyOn(listMembersService, 'handle')
          .mockResolvedValue(listMembersServiceResponse);
        users = await resolver.members(project, first, after);
      });
      test('親要素のprojectのidとfirst, afterをもとにApplicationServiceが呼ばれる', () => {
        expect(listBoardsByProjectIdService.handle).toHaveBeenCalledWith(
          project.id,
          first,
          after
        );
      });
      test('schema定義のUserConnectionの形式でレスポンスを返す(UserNodeのproject fieldはレスポンスに含まれない)', () => {
        expect(users).toEqual({
          pageInfo: {
            hasNextPage: listMembersServiceResponse.hasNextPage,
            endCursor: listMembersServiceResponse.edges[0].cursor,
          },
          edges: listMembersServiceResponse.edges,
        });
      });
    });

    describe('memberが1件もない時', () => {
      const listMembersServiceResponse: ListMembersResponse = {
        hasNextPage: false,
        edges: [],
      };
      let members: PromiseType<ReturnType<ProjectResolver['members']>>;
      const project = {
        id: 'project0001',
        name: 'project0001',
        color: Color.BLUE,
      } as Project;
      const first = 10;
      const after = 'cursor';
      beforeEach(async () => {
        jest
          .spyOn(listMembersService, 'handle')
          .mockResolvedValue(listMembersServiceResponse);
        members = await resolver.members(project, first, after);
      });
      test('pageInfoのendCursorがundefinedになる', () => {
        expect(members.pageInfo).toEqual({
          endCursor: undefined,
          hasNextPage: false,
        });
      });
    });
  });
});

type PromiseType<T> = T extends Promise<infer U> ? U : never;
