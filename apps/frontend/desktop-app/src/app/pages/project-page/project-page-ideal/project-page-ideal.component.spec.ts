import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPageIdealComponent } from './project-page-ideal.component';

describe('ProjectPageIdealComponent', () => {
  let component: ProjectPageIdealComponent;
  let fixture: ComponentFixture<ProjectPageIdealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPageIdealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPageIdealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
