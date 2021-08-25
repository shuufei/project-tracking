import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskReportCardComponent } from './task-report-card.component';
import { TaskReportCardModule } from './task-report-card.module';

describe('TaskReportCardComponent', () => {
  let component: TaskReportCardComponent;
  let fixture: ComponentFixture<TaskReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskReportCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
