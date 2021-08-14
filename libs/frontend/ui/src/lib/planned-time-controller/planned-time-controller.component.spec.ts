import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingLogChangePopupModule } from '../tracking-log-change-popup.module';
import { PlannedTimeControllerComponent } from './planned-time-controller.component';

describe('PlannedTimeControllerComponent', () => {
  let component: PlannedTimeControllerComponent;
  let fixture: ComponentFixture<PlannedTimeControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingLogChangePopupModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedTimeControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
