import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdjustButtonComponent } from './adjust-button.component';
import { AdjustButtonModule } from './adjust-button.module';

describe('AdjustButtonComponent', () => {
  let component: AdjustButtonComponent;
  let fixture: ComponentFixture<AdjustButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjustButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
