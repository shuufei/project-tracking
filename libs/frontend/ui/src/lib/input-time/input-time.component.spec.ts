import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTimeComponent } from './input-time.component';
import { InputTimeModule } from './input-time.module';

describe('InputTimeComponent', () => {
  let component: InputTimeComponent;
  let fixture: ComponentFixture<InputTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTimeModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
