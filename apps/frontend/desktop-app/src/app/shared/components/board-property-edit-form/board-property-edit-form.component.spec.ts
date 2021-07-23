import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardPropertyEditFormComponent } from './board-property-edit-form.component';
import { BoardPropertyEditFormModule } from './board-property-edit-form.module';

describe('BoardPropertyEditFormComponent', () => {
  let component: BoardPropertyEditFormComponent;
  let fixture: ComponentFixture<BoardPropertyEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardPropertyEditFormModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPropertyEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
