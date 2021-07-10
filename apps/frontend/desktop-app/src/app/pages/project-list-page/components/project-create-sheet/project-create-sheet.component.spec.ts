import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStateQuery, STATE_QUERY } from '@bison/frontend/application';
import { ProjectListPageModule } from '../../project-list-page.module';
import { ProjectCreateSheetComponent } from './project-create-sheet.component';

describe('ProjectCreateSheetComponent', () => {
  let component: ProjectCreateSheetComponent;
  let fixture: ComponentFixture<ProjectCreateSheetComponent>;
  const mockStateQuery = new MockStateQuery();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListPageModule],
      providers: [
        {
          provide: STATE_QUERY,
          useValue: mockStateQuery,
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
