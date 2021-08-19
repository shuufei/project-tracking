import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
} from '@bison/frontend/application';
import { of } from 'rxjs';
import { ProjectMemberUpdateSheetComponent } from './project-member-update-sheet.component';
import { ProjectMemberUpdateSheetModule } from './project-member-update-sheet.module';

describe('ProjectMemberUpdateSheetComponent', () => {
  let component: ProjectMemberUpdateSheetComponent;
  let fixture: ComponentFixture<ProjectMemberUpdateSheetComponent>;
  let apolloDataQuery: IApolloDataQuery;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectMemberUpdateSheetModule],
    }).compileComponents();
  });

  beforeEach(() => {
    apolloDataQuery = TestBed.inject(APOLLO_DATA_QUERY);
    jest.spyOn(apolloDataQuery, 'queryUsers').mockReturnValue(
      of({
        data: { users: [] },
        loading: false,
        networkStatus: 7,
      }) as ReturnType<IApolloDataQuery['queryUsers']>
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMemberUpdateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
