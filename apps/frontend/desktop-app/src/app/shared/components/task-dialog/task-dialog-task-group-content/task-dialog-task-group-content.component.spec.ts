import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogTaskGroupContentComponent } from './task-dialog-task-group-content.component';

describe('TaskDialogTaskGroupContentComponent', () => {
  let component: TaskDialogTaskGroupContentComponent;
  let fixture: ComponentFixture<TaskDialogTaskGroupContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDialogTaskGroupContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogTaskGroupContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
