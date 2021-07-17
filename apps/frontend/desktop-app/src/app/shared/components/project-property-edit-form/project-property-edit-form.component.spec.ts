import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectPropertyEditFormComponent } from './project-property-edit-form.component';
import { ProjectPropertyEditFormModule } from './project-property-edit-form.module';

describe('ProjectPropertyEditFormComponent', () => {
  let component: ProjectPropertyEditFormComponent;
  let fixture: ComponentFixture<ProjectPropertyEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPropertyEditFormModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPropertyEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
