import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { mockProjects } from '../../../../testing/mock';
import {
  ProjectPageComponent,
  PROJECT_PAGE_QUERY,
} from '../project-page.component';
import { ProjectPageModule } from '../project-page.module';
import { ProjectPageComponentHarness } from './project-page.component.harness';

describe('ProjectPageComponent', () => {
  let component: ProjectPageComponent;
  let fixture: ComponentFixture<ProjectPageComponent>;
  let harness: ProjectPageComponentHarness;
  let testingController: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPageModule, ApolloTestingModule],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ProjectPageComponent);
    component = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      ProjectPageComponentHarness
    );
    testingController = TestBed.inject(ApolloTestingController);
  });

  beforeEach(async () => {
    const op = testingController.expectOne(PROJECT_PAGE_QUERY);
    op.flush({
      data: {
        viewer: {
          projects: mockProjects,
        },
      },
    });
    fixture.detectChanges();
  });

  afterEach(() => {
    testingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('プロジェクト一覧が表示される', async () => {
    const elements = await harness.getProjectElements();
    expect(elements.length).toBe(mockProjects.length);
  });
});
