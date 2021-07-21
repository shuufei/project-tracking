import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCreateSheetComponent } from './board-create-sheet.component';

describe('BoardCreateSheetComponent', () => {
  let component: BoardCreateSheetComponent;
  let fixture: ComponentFixture<BoardCreateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardCreateSheetComponent ]
    })
    .compileComponents();
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
