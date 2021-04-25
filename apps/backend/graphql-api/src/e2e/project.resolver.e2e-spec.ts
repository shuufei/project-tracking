import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app/app.module';

describe('E2E', () => {
  let app: INestApplication;
  const path = '/graphql';

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('query viewer', () => {
    it('ログインユーザ情報を取得できる', async () => {
      return request(app.getHttpServer())
        .post(path)
        .send({
          query: `{
              viewer {
                id
                name
                icon
              }
            }`,
        })
        .expect(200);
    });
  });
});
