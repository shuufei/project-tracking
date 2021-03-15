import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusChangeButtonComponent } from './status-change-button.component';
import { StatusChangeButtonModule } from './status-change-button.module';

describe('StatusChangeButtonComponent', () => {
  let component: StatusChangeButtonComponent;
  let fixture: ComponentFixture<StatusChangeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusChangeButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusChangeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
