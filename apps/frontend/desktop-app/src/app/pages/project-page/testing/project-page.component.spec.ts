import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PROJECT_STATE_QUERY_SERVICE } from '@bison/frontend/application';
import { ProjectPageComponent } from '../project-page.component';
import { ProjectPageModule } from '../project-page.module';
import { mockProjects, MockProjectStateQueryService } from './mock';
import { ProjectPageComponentHarness } from './project-page.component.harness';

describe('ProjectPageComponent', () => {
  let component: ProjectPageComponent;
  let fixture: ComponentFixture<ProjectPageComponent>;
  let harness: ProjectPageComponentHarness;
  const mockProjectStateQueryService = new MockProjectStateQueryService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPageModule],
      providers: [
        {
          provide: PROJECT_STATE_QUERY_SERVICE,
          useValue: mockProjectStateQueryService,
        },
      ],
    }).compileComponents();
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
    expect(elements.length).toBe(mockProjects.length);
  });
});
