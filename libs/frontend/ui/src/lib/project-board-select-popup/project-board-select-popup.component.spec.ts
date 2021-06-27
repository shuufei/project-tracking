import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectBoardSelectPopupComponent } from './project-board-select-popup.component';
import { ProjectBoardSelectPopupModule } from './project-board-select-popup.module';

describe('ProjectBoardSelectPopupComponent', () => {
  let component: ProjectBoardSelectPopupComponent;
  let fixture: ComponentFixture<ProjectBoardSelectPopupComponent>;
  const triggerEl = document.createElement('button');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectBoardSelectPopupModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBoardSelectPopupComponent);
    component = fixture.componentInstance;
    component.triggerEl = triggerEl;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
