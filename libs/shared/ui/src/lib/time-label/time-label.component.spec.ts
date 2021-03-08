import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeLabelComponent } from './time-label.component';
import { TimeLabelModule } from './time-label.module';

describe('TimeLabelComponent', () => {
  let component: TimeLabelComponent;
  let fixture: ComponentFixture<TimeLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeLabelModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
