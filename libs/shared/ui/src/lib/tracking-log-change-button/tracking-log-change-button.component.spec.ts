import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingLogChangeButtonComponent } from './tracking-log-change-button.component';

describe('TrackingLogChangeButtonComponent', () => {
  let component: TrackingLogChangeButtonComponent;
  let fixture: ComponentFixture<TrackingLogChangeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingLogChangeButtonComponent ]
    })
    .compileComponents();
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
