import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubtaskCardComponent } from './subtask-card.component';
import { SubtaskCardModule } from './subtask-card.module';

describe('SubtaskCardComponent', () => {
  let component: SubtaskCardComponent;
  let fixture: ComponentFixture<SubtaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtaskCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
