import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectPageModule } from '../../project-page.module';
import { BoardDetailComponent } from './board-detail.component';

describe('BoardDetailComponent', () => {
  let component: BoardDetailComponent;
  let fixture: ComponentFixture<BoardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPageModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
