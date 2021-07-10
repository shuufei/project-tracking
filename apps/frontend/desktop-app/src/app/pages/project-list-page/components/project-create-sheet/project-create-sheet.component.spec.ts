import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ME_STATE_QUERY } from '@bison/frontend/application';
import { ProjectListPageModule } from '../../project-list-page.module';
import { MockMeStateQueryService } from '../../testing/mock';
import { ProjectCreateSheetComponent } from './project-create-sheet.component';

describe('ProjectCreateSheetComponent', () => {
  let component: ProjectCreateSheetComponent;
  let fixture: ComponentFixture<ProjectCreateSheetComponent>;
  const mockMeStateQuery = new MockMeStateQueryService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListPageModule],
      providers: [
        {
          provide: ME_STATE_QUERY,
          useValue: mockMeStateQuery,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
