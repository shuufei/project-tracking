import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSelectPopupComponent } from './user-select-popup.component';
import { UserSelectPopupModule } from './user-select-popup.module';

describe('UserSelectPopupComponent', () => {
  let component: UserSelectPopupComponent;
  let fixture: ComponentFixture<UserSelectPopupComponent>;
  const triggerEl = document.createElement('button');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSelectPopupModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectPopupComponent);
    component = fixture.componentInstance;
    component.triggerEl = triggerEl;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
