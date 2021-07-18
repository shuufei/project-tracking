import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
} from '@bison/frontend/application';
import { of } from 'rxjs';
import { mockViewer } from '../../../../testing/mock';
import { ProjectPageComponent } from '../project-page.component';
import { ProjectPageModule } from '../project-page.module';
import { ProjectPageComponentHarness } from './project-page.component.harness';

describe('ProjectPageComponent', () => {
  let component: ProjectPageComponent;
  let fixture: ComponentFixture<ProjectPageComponent>;
  let harness: ProjectPageComponentHarness;
  let apolloDataQuery: IApolloDataQuery;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPageModule],
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
    fixture = TestBed.createComponent(ProjectPageComponent);
    component = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      ProjectPageComponentHarness
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
