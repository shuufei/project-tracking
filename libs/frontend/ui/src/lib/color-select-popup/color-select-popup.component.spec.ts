import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSelectPopupComponent } from './color-select-popup.component';

describe('ColorSelectPopupComponent', () => {
  let component: ColorSelectPopupComponent;
  let fixture: ComponentFixture<ColorSelectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorSelectPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSelectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
