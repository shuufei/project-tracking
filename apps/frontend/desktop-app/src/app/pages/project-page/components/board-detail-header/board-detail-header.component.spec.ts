import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectPageModule } from '../../project-page.module';
import { BoardDetailHeaderComponent } from './board-detail-header.component';

describe('BoardDetailHeaderComponent', () => {
  let component: BoardDetailHeaderComponent;
  let fixture: ComponentFixture<BoardDetailHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPageModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
