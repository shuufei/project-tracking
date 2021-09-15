import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
} from '@bison/frontend/application';
import { Project } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  PROJECT_FIELDS,
  PROJECT_FRAGMENT_NAME,
} from '../../shared/fragments/project-fragment';
import { convertToFrontendDomainProjectFromApiProject } from '../../util/convert-to-frontend-domain-project-from-api-project';
import { nonNullable } from '../../util/custom-operators/non-nullable';

const VIEWER_FIELDS = gql`
  ${PROJECT_FIELDS}
  fragment ViewerPartsInProjectListPage on User {
    id
    name
    icon
    projects {
      ...${PROJECT_FRAGMENT_NAME}
    }
  }
`;

type State = {
  projects: Project[];
  deleteState: {
    isOpenDialog: boolean;
    project?: Project;
  };
};

@Component({
  selector: 'bis-project-list-page',
  templateUrl: './project-list-page.component.html',
  styleUrls: ['./project-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectListPageComponent implements OnInit {
  readonly state$ = this.state.select();
  readonly isOpenDeleteDialog$ = this.state.select(
    'deleteState',
    'isOpenDialog'
  );

  readonly onClickedDeleteProject$ = new Subject<Project>();

  private readonly onInit$ = new Subject();
  readonly onOpenedDeleteProjectDialog$ = new Subject<void>();
  readonly onClosedDeleteProjectDialog$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY)
    private readonly apolloDataQuery: IApolloDataQuery
  ) {
    this.state.set({
      projects: [],
      deleteState: {
        isOpenDialog: false,
      },
    });
    this.state.hold(this.onClickedDeleteProject$, (project) => {
      this.state.set('deleteState', () => ({
        isOpenDialog: true,
        project,
      }));
    });
    this.state.connect(
      'deleteState',
      this.onOpenedDeleteProjectDialog$,
      (state) => {
        return {
          ...state.deleteState,
          isOpenDialog: true,
        };
      }
    );
    this.state.connect('deleteState', this.onClosedDeleteProjectDialog$, () => {
      return {
        isOpenDialog: false,
        project: undefined,
      };
    });
  }

  ngOnInit() {
    this.setupEventHandler();
    this.onInit$.next();
  }

  private setupEventHandler() {
    this.state.connect(
      'projects',
      this.apolloDataQuery
        .queryViewer({
          name: 'ViewerPartsInProjectListPage',
          fields: VIEWER_FIELDS,
        })
        .pipe(
          map((response) => response?.data?.viewer),
          nonNullable(),
          map((viewer) => {
            return (
              viewer.projects.map(
                convertToFrontendDomainProjectFromApiProject
              ) ?? []
            );
          })
        )
    );
  }
}
