import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPropertyEditFormComponent } from './board-property-edit-form.component';

describe('BoardPropertyEditFormComponent', () => {
  let component: BoardPropertyEditFormComponent;
  let fixture: ComponentFixture<BoardPropertyEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardPropertyEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPropertyEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
