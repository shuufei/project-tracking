import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskReportComponent } from './task-report.component';
import { TaskReportModule } from './task-report.module';

describe('TaskReportComponent', () => {
  let component: TaskReportComponent;
  let fixture: ComponentFixture<TaskReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskReportModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
