import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubtaskComponent } from './subtask.component';
import { SubtaskModule } from './subtask.module';

describe('SubtaskComponent', () => {
  let component: SubtaskComponent;
  let fixture: ComponentFixture<SubtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtaskModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
