import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectNavigationComponent } from './project-navigation.component';
import { ProjectNavigationModule } from './project-navigation.module';

describe('ProjectNavigationComponent', () => {
  let component: ProjectNavigationComponent;
  let fixture: ComponentFixture<ProjectNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectNavigationModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
