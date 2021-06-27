import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingLogChangePopupComponent } from './tracking-log-change-popup.component';
import { TrackingLogChangePopupModule } from './tracking-log-change-popup.module';

describe('TrackingLogChangePopupComponent', () => {
  let component: TrackingLogChangePopupComponent;
  let fixture: ComponentFixture<TrackingLogChangePopupComponent>;
  const triggerEl = document.createElement('button');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingLogChangePopupModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingLogChangePopupComponent);
    component = fixture.componentInstance;
    component.triggerEl = triggerEl;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
