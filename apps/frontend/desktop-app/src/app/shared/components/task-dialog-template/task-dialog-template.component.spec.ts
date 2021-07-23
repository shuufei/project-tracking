import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDialogTemplateComponent } from './task-dialog-template.component';
import { TaskDialogTemplateModule } from './task-dialog-template.module';

describe('TaskDialogTemplateComponent', () => {
  let component: TaskDialogTemplateComponent;
  let fixture: ComponentFixture<TaskDialogTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDialogTemplateModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
