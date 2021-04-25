import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { take, tap } from 'rxjs/operators';
import { LIST_ME_PROJECTS } from '../gql/list-me-projects';
import { ProjectDataStore } from '../project-data-store';
import { mockProjectsQueryRresponse } from '../testing/mock';

describe('ProjectDataStore', () => {
  let dataStore: ProjectDataStore;
  let testingController: ApolloTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      providers: [ProjectDataStore],
    });
  });

  beforeEach(() => {
    dataStore = TestBed.inject(ProjectDataStore);
    testingController = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    testingController.verify();
  });

  describe('project一覧取得', () => {
    test('Query { projects } が実行され、レスポンスを取得できる', fakeAsync(() => {
      dataStore
        .projects$()
        .pipe(
          take(1),
          tap((projects) => {
            expect(projects.length).toBe(
              mockProjectsQueryRresponse.viewer.projects.length
            );
          })
        )
        .subscribe();
      const op = testingController.expectOne(LIST_ME_PROJECTS);
      op.flush({
        data: mockProjectsQueryRresponse,
      });
      flush();
    }));
  });
});
