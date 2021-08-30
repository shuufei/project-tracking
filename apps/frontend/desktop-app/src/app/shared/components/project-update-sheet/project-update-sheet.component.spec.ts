import { ComponentFixture, TestBed } from '@angular/core/testing';
import { COLOR } from '@bison/shared/domain';
import { ProjectUpdateSheetComponent } from './project-update-sheet.component';
import { ProjectUpdateSheetModule } from './project-update-sheet.module';

describe('ProjectUpdateSheetComponent', () => {
  let component: ProjectUpdateSheetComponent;
  let fixture: ComponentFixture<ProjectUpdateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectUpdateSheetModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUpdateSheetComponent);
    component = fixture.componentInstance;
    component.project = {
      id: 'id',
      name: 'name',
      description: 'description',
      color: COLOR.Red,
      admin: {
        id: 'id',
        name: 'admin name',
      },
      members: [],
      boards: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
