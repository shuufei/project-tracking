import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardUpdateSheetComponent } from './board-update-sheet.component';
import { BoardUpdateSheetModule } from './board-update-sheet.module';

describe('BoardUpdateSheetComponent', () => {
  let component: BoardUpdateSheetComponent;
  let fixture: ComponentFixture<BoardUpdateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardUpdateSheetModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardUpdateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
