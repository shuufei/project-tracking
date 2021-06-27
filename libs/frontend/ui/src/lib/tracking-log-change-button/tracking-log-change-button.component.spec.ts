import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingLogChangeButtonComponent } from './tracking-log-change-button.component';
import { TrackingLogChangeButtonModule } from './tracking-log-change-button.module';

describe('TrackingLogChangeButtonComponent', () => {
  let component: TrackingLogChangeButtonComponent;
  let fixture: ComponentFixture<TrackingLogChangeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingLogChangeButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingLogChangeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
