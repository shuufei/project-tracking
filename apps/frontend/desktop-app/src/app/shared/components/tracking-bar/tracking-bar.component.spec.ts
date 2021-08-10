import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingBarComponent } from './tracking-bar.component';
import { TrackingBarModule } from './tracking-bar.module';

describe('TrackingBarComponent', () => {
  let component: TrackingBarComponent;
  let fixture: ComponentFixture<TrackingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackingBarModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
