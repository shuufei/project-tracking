import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreateSheetComponent } from './project-create-sheet.component';

describe('ProjectCreateSheetComponent', () => {
  let component: ProjectCreateSheetComponent;
  let fixture: ComponentFixture<ProjectCreateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCreateSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
