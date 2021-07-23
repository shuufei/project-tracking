import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardSelectPopupComponent } from './board-select-popup.component';
import { BoardSelectPopupModule } from './board-select-popup.module';

describe('BoardSelectPopupComponent', () => {
  let component: BoardSelectPopupComponent;
  let fixture: ComponentFixture<BoardSelectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardSelectPopupModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSelectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
