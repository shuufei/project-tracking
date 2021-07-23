import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardCreateSheetComponent } from './board-create-sheet.component';
import { BoardCreateSheetModule } from './board-create-sheet.module';

describe('BoardCreateSheetComponent', () => {
  let component: BoardCreateSheetComponent;
  let fixture: ComponentFixture<BoardCreateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardCreateSheetModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCreateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
