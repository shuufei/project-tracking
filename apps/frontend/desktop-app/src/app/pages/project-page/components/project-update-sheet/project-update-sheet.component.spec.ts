import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
} from '@bison/frontend/application';
import { COLOR } from '@bison/shared/domain';
import { of } from 'rxjs';
import { mockViewer } from '../../../../../testing/mock';
import { ProjectPageModule } from '../../project-page.module';
import { ProjectUpdateSheetComponent } from './project-update-sheet.component';

describe('ProjectUpdateSheetComponent', () => {
  let component: ProjectUpdateSheetComponent;
  let fixture: ComponentFixture<ProjectUpdateSheetComponent>;
  let apolloDataQuery: IApolloDataQuery;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPageModule],
    }).compileComponents();
  });

  beforeEach(() => {
    apolloDataQuery = TestBed.inject(APOLLO_DATA_QUERY);
    jest.spyOn(apolloDataQuery, 'queryViewer').mockReturnValue(
      of({
        data: { viewer: mockViewer },
        loading: false,
        networkStatus: 7,
      }) as ReturnType<IApolloDataQuery['queryViewer']>
    );
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
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
