import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InMemoryCache } from '@apollo/client/core';
import { mockMe } from '@bison/frontend/application';
import {
  ApolloTestingModule,
  APOLLO_TESTING_CACHE,
} from 'apollo-angular/testing';
import { ProjectListPageModule } from '../../project-list-page.module';
import {
  ME_QUERY,
  ProjectCreateSheetComponent,
} from './project-create-sheet.component';

describe('ProjectCreateSheetComponent', () => {
  let component: ProjectCreateSheetComponent;
  let fixture: ComponentFixture<ProjectCreateSheetComponent>;
  const cache = new InMemoryCache({});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListPageModule, ApolloTestingModule],
      providers: [
        {
          provide: APOLLO_TESTING_CACHE,
          useValue: cache,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateSheetComponent);
    component = fixture.componentInstance;
  });

  beforeEach(async () => {
    cache.writeQuery({
      query: ME_QUERY,
      data: {
        viewer: {
          ...mockMe,
          __typename: 'User',
        },
      },
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
