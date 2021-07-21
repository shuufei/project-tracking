import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListPageModule } from '../../project-list-page.module';
import { ProjectCreateSheetComponent } from './project-create-sheet.component';

describe('ProjectCreateSheetComponent', () => {
  let component: ProjectCreateSheetComponent;
  let fixture: ComponentFixture<ProjectCreateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListPageModule],
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
