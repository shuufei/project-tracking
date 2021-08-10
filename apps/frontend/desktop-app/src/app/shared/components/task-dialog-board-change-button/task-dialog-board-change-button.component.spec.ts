import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDialogBoardChangeButtonComponent } from './task-dialog-board-change-button.component';
import { TaskDialogBoardChangeButtonModule } from './task-dialog-board-change-button.module';

describe('TaskDialogBoardChangeButtonComponent', () => {
  let component: TaskDialogBoardChangeButtonComponent;
  let fixture: ComponentFixture<TaskDialogBoardChangeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDialogBoardChangeButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogBoardChangeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
