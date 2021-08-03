import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogTaskContentComponent } from './task-dialog-task-content.component';

describe('TaskDialogTaskContentComponent', () => {
  let component: TaskDialogTaskContentComponent;
  let fixture: ComponentFixture<TaskDialogTaskContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDialogTaskContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogTaskContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
