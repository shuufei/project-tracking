import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectCreateSheetComponent } from './project-create-sheet.component';
import { ProjectCreateSheetModule } from './project-create-sheet.module';

describe('ProjectCreateSheetComponent', () => {
  let component: ProjectCreateSheetComponent;
  let fixture: ComponentFixture<ProjectCreateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCreateSheetModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateSheetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
