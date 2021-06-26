import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingLogPopupComponent } from './tracking-log-popup.component';
import { TrackingLogPopupModule } from './tracking-log-popup.module';

describe('TrackingLogPopupComponent', () => {
  let component: TrackingLogPopupComponent;
  let fixture: ComponentFixture<TrackingLogPopupComponent>;
  const triggerEl = document.createElement('button');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingLogPopupModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingLogPopupComponent);
    component = fixture.componentInstance;
    component.triggerEl = triggerEl;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
