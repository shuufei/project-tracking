import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectAdminUpdateSheetComponent } from './project-admin-update-sheet.component';
import { ProjectAdminUpdateSheetModule } from './project-admin-update-sheet.module';

describe('ProjectAdminUpdateSheetComponent', () => {
  let component: ProjectAdminUpdateSheetComponent;
  let fixture: ComponentFixture<ProjectAdminUpdateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectAdminUpdateSheetModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAdminUpdateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
