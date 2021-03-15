import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignChangeButtonComponent } from './assign-change-button.component';
import { AssignChangeButtonModule } from './assign-change-button.module';

describe('AssignChangeButtonComponent', () => {
  let component: AssignChangeButtonComponent;
  let fixture: ComponentFixture<AssignChangeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignChangeButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignChangeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
