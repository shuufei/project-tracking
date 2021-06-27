import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorSelectPopupComponent } from './color-select-popup.component';
import { ColorSelectPopupModule } from './color-select-popup.module';

describe('ColorSelectPopupComponent', () => {
  let component: ColorSelectPopupComponent;
  let fixture: ComponentFixture<ColorSelectPopupComponent>;
  const triggerEl = document.createElement('button');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorSelectPopupModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSelectPopupComponent);
    component = fixture.componentInstance;
    component.triggerEl = triggerEl;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
