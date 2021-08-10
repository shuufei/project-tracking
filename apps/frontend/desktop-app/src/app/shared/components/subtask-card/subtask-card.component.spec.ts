import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ApolloDataQuery,
  APOLLO_DATA_QUERY,
} from '@bison/frontend/application';
import { createSpyObj } from 'jest-createspyobj';
import { of } from 'rxjs';
import { SubtaskCardComponent } from './subtask-card.component';
import { SubtaskCardModule } from './subtask-card.module';

describe('SubtaskCardComponent', () => {
  let component: SubtaskCardComponent;
  let fixture: ComponentFixture<SubtaskCardComponent>;
  const apolloDataQuery = createSpyObj(ApolloDataQuery);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtaskCardModule],
      providers: [
        {
          provide: APOLLO_DATA_QUERY,
          useValue: apolloDataQuery,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    apolloDataQuery.queryUsers.mockReturnValue(
      of({ data: { users: [] }, loading: false, networkStatus: 7 })
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
