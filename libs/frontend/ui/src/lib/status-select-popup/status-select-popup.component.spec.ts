import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusSelectPopupComponent } from './status-select-popup.component';
import { StatusSelectPopupModule } from './status-select-popup.module';

describe('StatusSelectPopupComponent', () => {
  let component: StatusSelectPopupComponent;
  let fixture: ComponentFixture<StatusSelectPopupComponent>;
  const triggerEl = document.createElement('button');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusSelectPopupModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSelectPopupComponent);
    component = fixture.componentInstance;
    component.triggerEl = triggerEl;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
