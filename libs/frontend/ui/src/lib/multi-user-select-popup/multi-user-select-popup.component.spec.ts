import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiUserSelectPopupComponent } from './multi-user-select-popup.component';
import { MultiUserSelectPopupModule } from './multi-user-select-popup.module';

describe('MultiUserSelectPopupComponent', () => {
  let component: MultiUserSelectPopupComponent;
  let fixture: ComponentFixture<MultiUserSelectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiUserSelectPopupModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUserSelectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
