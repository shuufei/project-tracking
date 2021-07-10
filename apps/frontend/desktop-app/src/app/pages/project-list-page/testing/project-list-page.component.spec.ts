import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  mockProjects,
  MockStateQuery,
  STATE_QUERY,
} from '@bison/frontend/application';
import { ProjectListPageComponent } from '../project-list-page.component';
import { ProjectListPageModule } from '../project-list-page.module';
import { ProjectListPageComponentHarness } from './project-list-page.component.harness';

describe('ProjectListPageComponent', () => {
  let component: ProjectListPageComponent;
  let fixture: ComponentFixture<ProjectListPageComponent>;
  let harness: ProjectListPageComponentHarness;
  const mockStateQuery = new MockStateQuery();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListPageModule, RouterTestingModule],
      providers: [
        {
          provide: STATE_QUERY,
          useValue: mockStateQuery,
        },
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('プロジェクト一覧が表示される', async () => {
    const elements = await harness.getProjectElements();
    expect(elements.length).toBe(mockProjects.length);
  });
});
