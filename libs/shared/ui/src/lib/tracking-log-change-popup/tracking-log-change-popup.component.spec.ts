import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingLogChangePopupComponent } from './tracking-log-change-popup.component';

describe('TrackingLogChangePopupComponent', () => {
  let component: TrackingLogChangePopupComponent;
  let fixture: ComponentFixture<TrackingLogChangePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingLogChangePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingLogChangePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
