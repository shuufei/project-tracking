import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingLogChangePopupModule } from '../tracking-log-change-popup.module';
import { TrackingTimeControllerComponent } from './tracking-time-controller.component';

describe('TrackingTimeControllerComponent', () => {
  let component: TrackingTimeControllerComponent;
  let fixture: ComponentFixture<TrackingTimeControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingLogChangePopupModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingTimeControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
