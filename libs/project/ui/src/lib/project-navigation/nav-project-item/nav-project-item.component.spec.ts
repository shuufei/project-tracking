import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavProjectItemComponent } from './nav-project-item.component';

describe('NavProjectItemComponent', () => {
  let component: NavProjectItemComponent;
  let fixture: ComponentFixture<NavProjectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavProjectItemComponent ]
    })
    .compileComponents();
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
