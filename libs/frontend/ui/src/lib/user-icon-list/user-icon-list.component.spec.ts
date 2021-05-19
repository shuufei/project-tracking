import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserIconListComponent } from './user-icon-list.component';
import { UserIconListModule } from './user-icon-list.module';

describe('UserIconListComponent', () => {
  let component: UserIconListComponent;
  let fixture: ComponentFixture<UserIconListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserIconListModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
