import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskGroupReportCardComponent } from './task-group-report-card.component';
import { TaskGroupReportCardModule } from './task-group-report-card.module';

describe('TaskGroupReportCardComponent', () => {
  let component: TaskGroupReportCardComponent;
  let fixture: ComponentFixture<TaskGroupReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskGroupReportCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskGroupReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
