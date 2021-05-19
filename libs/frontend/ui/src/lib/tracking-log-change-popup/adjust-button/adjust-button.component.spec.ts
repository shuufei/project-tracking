import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustButtonComponent } from './adjust-button.component';

describe('AdjustButtonComponent', () => {
  let component: AdjustButtonComponent;
  let fixture: ComponentFixture<AdjustButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdjustButtonComponent],
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
