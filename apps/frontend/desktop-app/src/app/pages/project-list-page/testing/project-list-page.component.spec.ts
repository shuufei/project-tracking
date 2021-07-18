import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { mockProjects } from '../../../../testing/mock';
import {
  ProjectListPageComponent,
  PROJECT_LIST_PAGE_QUERY,
} from '../project-list-page.component';
import { ProjectListPageModule } from '../project-list-page.module';
import { ProjectListPageComponentHarness } from './project-list-page.component.harness';

describe('ProjectListPageComponent', () => {
  let component: ProjectListPageComponent;
  let fixture: ComponentFixture<ProjectListPageComponent>;
  let harness: ProjectListPageComponentHarness;
  let testingController: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectListPageModule,
        RouterTestingModule,
        ApolloTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ProjectListPageComponent);
    component = fixture.componentInstance;
    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      ProjectListPageComponentHarness
    );
    testingController = TestBed.inject(ApolloTestingController);
  });

  beforeEach(async () => {
    const op = testingController.expectOne(PROJECT_LIST_PAGE_QUERY);
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
