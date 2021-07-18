import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
} from '@bison/frontend/application';
import { of } from 'rxjs';
import { mockViewer } from '../../../../testing/mock';
import { ProjectListPageComponent } from '../project-list-page.component';
import { ProjectListPageModule } from '../project-list-page.module';
import { ProjectListPageComponentHarness } from './project-list-page.component.harness';

describe('ProjectListPageComponent', () => {
  let component: ProjectListPageComponent;
  let fixture: ComponentFixture<ProjectListPageComponent>;
  let harness: ProjectListPageComponentHarness;
  let apolloDataQuery: IApolloDataQuery;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListPageModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    apolloDataQuery = TestBed.inject(APOLLO_DATA_QUERY);
    jest.spyOn(apolloDataQuery, 'queryViewer').mockReturnValue(
      of({
        data: { viewer: mockViewer },
        loading: false,
        networkStatus: 7,
      }) as ReturnType<IApolloDataQuery['queryViewer']>
    );
    jest.spyOn(apolloDataQuery, 'queryUsers').mockReturnValue(
      of({
        data: { users: [] },
        loading: false,
        networkStatus: 7,
      }) as ReturnType<IApolloDataQuery['queryUsers']>
    );
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ProjectListPageComponent);
    component = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      ProjectListPageComponentHarness
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('プロジェクト一覧が表示される', async () => {
    const elements = await harness.getProjectElements();
    expect(elements.length).toBe(mockViewer.projects.length);
  });
});
