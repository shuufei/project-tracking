import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUpdateSheetComponent } from './project-update-sheet.component';

describe('ProjectUpdateSheetComponent', () => {
  let component: ProjectUpdateSheetComponent;
  let fixture: ComponentFixture<ProjectUpdateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectUpdateSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUpdateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
