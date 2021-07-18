import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectDeleteDialogComponent } from './project-delete-dialog.component';
import { ProjectDeleteDialogModule } from './project-delete-dialog.module';

describe('ProjectDeleteDialogComponent', () => {
  let component: ProjectDeleteDialogComponent;
  let fixture: ComponentFixture<ProjectDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDeleteDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
