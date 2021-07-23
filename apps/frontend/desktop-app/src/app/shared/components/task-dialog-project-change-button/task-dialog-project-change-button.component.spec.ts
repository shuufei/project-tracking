import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDialogProjectChangeButtonComponent } from './task-dialog-project-change-button.component';
import { TaskDialogProjectChangeButtonModule } from './task-dialog-project-change-button.module';

describe('TaskDialogProjectChangeButtonComponent', () => {
  let component: TaskDialogProjectChangeButtonComponent;
  let fixture: ComponentFixture<TaskDialogProjectChangeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDialogProjectChangeButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogProjectChangeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
