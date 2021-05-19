import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusSelectPopupComponent } from './status-select-popup.component';
import { StatusSelectPopupModule } from './status-select-popup.module';

describe('StatusSelectPopupComponent', () => {
  let component: StatusSelectPopupComponent;
  let fixture: ComponentFixture<StatusSelectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusSelectPopupModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSelectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
