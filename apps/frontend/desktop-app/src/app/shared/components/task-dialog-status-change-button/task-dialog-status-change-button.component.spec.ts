import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDialogStatusChangeButtonComponent } from './task-dialog-status-change-button.component';
import { TaskDialogStatusChangeButtonModule } from './task-dialog-status-change-button.module';

describe('TaskDialogStatusChangeButtonComponent', () => {
  let component: TaskDialogStatusChangeButtonComponent;
  let fixture: ComponentFixture<TaskDialogStatusChangeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDialogStatusChangeButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogStatusChangeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
