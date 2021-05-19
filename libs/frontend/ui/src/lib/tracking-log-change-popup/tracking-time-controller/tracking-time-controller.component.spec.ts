import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingTimeControllerComponent } from './tracking-time-controller.component';

describe('TrackingTimeControllerComponent', () => {
  let component: TrackingTimeControllerComponent;
  let fixture: ComponentFixture<TrackingTimeControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackingTimeControllerComponent],
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
