import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingLogPopupComponent } from './tracking-log-popup.component';

describe('TrackingLogPopupComponent', () => {
  let component: TrackingLogPopupComponent;
  let fixture: ComponentFixture<TrackingLogPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrackingLogPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingLogPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
