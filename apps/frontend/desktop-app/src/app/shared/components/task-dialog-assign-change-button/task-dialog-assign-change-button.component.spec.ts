import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDialogAssignChangeButtonComponent } from './task-dialog-assign-change-button.component';
import { TaskDialogAssignChangeButtonModule } from './task-dialog-assign-change-button.module';

describe('TaskDialogAssignChangeButtonComponent', () => {
  let component: TaskDialogAssignChangeButtonComponent;
  let fixture: ComponentFixture<TaskDialogAssignChangeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDialogAssignChangeButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogAssignChangeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
