import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectNavigationModule } from '../project-navigation.module';
import { NavProjectItemComponent } from './nav-project-item.component';

describe('NavProjectItemComponent', () => {
  let component: NavProjectItemComponent;
  let fixture: ComponentFixture<NavProjectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectNavigationModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavProjectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
