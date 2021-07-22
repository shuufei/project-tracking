import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardDeleteDialogComponent } from './board-delete-dialog.component';
import { BoardDeleteDialogModule } from './board-delete-dialog.module';

describe('BoardDeleteDialogComponent', () => {
  let component: BoardDeleteDialogComponent;
  let fixture: ComponentFixture<BoardDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDeleteDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
