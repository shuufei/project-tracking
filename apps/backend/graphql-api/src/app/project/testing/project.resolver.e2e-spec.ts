import {
  GET_BACKLOG_BY_PROJECT_ID_SERVICE,
  LIST_BOARDS_BY_PROJECT_ID_SERVICE,
  LIST_PROJECTS_SERVICE,
  LIST_USERS_BY_PROJECT_ID_SERVICE,
} from '@bison/backend/application';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../app.module';
import {
  MockGetBacklogByProjectIdService,
  MockListBoardsByProjectIdService,
  MockListProjectsService,
  MockListUsersByProjectIdService,
} from './mock';

describe('ProjectResolver', () => {
  let app: INestApplication;
  const path = '/graphql';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
      // TODO: mockではなく、DB結合まで含めてテストできるようにする
      providers: [
        {
          provide: LIST_PROJECTS_SERVICE,
          useValue: new MockListProjectsService(),
        },
        {
          provide: GET_BACKLOG_BY_PROJECT_ID_SERVICE,
          useValue: new MockGetBacklogByProjectIdService(),
        },
        {
          provide: LIST_BOARDS_BY_PROJECT_ID_SERVICE,
          useValue: new MockListBoardsByProjectIdService(),
        },
        {
          provide: LIST_USERS_BY_PROJECT_ID_SERVICE,
          useValue: new MockListUsersByProjectIdService(),
        },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('query projects', () => {
    it('project一覧を取得できる', async () => {
      return request(app.getHttpServer())
        .post(path)
        .send({
          query: `{
              projects(first: 3) {
                pageInfo {
                  endCursor
                  hasNextPage
                }
                edges {
                  cursor
                  node {
                    id
                  }
                }
              }
            }`,
        })
        .expect(200);
    });
  });
});
