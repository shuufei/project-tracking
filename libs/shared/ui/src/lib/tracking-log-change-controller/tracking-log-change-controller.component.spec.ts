import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingLogChangeControllerComponent } from './tracking-log-change-controller.component';
import { TrackingLogChangeControllerModule } from './tracking-log-change-controller.module';

describe('TrackingLogChangeControllerComponent', () => {
  let component: TrackingLogChangeControllerComponent;
  let fixture: ComponentFixture<TrackingLogChangeControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingLogChangeControllerModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingLogChangeControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
