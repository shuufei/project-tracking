import { Test, TestingModule } from '@nestjs/testing';
import { ProjectModule } from '../project.module';
import { ProjectResolver } from '../project.resolver';

describe('ProjectResolver', () => {
  let moduleRef: TestingModule;
  let resolver: ProjectResolver;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [ProjectModule],
      providers: [],
    }).compile();
  });

  beforeEach(() => {
    resolver = moduleRef.get(ProjectResolver);
  });

  describe('query projects', () => {
    describe('正常系', () => {
      test('project一覧を取得できる', () => {
        expect(resolver).toBeTruthy();
      });
    });
  });
});
