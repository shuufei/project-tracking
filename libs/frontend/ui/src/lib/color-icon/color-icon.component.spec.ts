import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorIconComponent } from './color-icon.component';
import { ColorIconModule } from './color-icon.module';

describe('ColorIconComponent', () => {
  let component: ColorIconComponent;
  let fixture: ComponentFixture<ColorIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorIconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
