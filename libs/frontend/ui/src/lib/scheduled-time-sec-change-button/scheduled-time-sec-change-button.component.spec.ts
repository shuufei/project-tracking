import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduledTimeSecChangeButtonComponent } from './scheduled-time-sec-change-button.component';
import { ScheduledTimeSecChangeButtonModule } from './scheduled-time-sec-change-button.module';

describe('ScheduledTimeSecChangeButtonComponent', () => {
  let component: ScheduledTimeSecChangeButtonComponent;
  let fixture: ComponentFixture<ScheduledTimeSecChangeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledTimeSecChangeButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledTimeSecChangeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
