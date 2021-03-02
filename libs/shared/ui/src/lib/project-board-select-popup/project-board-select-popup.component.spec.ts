import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectBoardSelectPopupComponent } from './project-board-select-popup.component';
import { ProjectBoardSelectPopupModule } from './project-board-select-popup.module';

describe('ProjectBoardSelectPopupComponent', () => {
  let component: ProjectBoardSelectPopupComponent;
  let fixture: ComponentFixture<ProjectBoardSelectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectBoardSelectPopupModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoardSelectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
