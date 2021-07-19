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
import { COLOR } from '@bison/shared/domain';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertToFrontendDomainProjectFromApiProject } from '../../util/convert-to-frontend-domain-project-from-api-project';

export const VIEWER_FIELDS = gql`
  fragment ViewerPartsInProjectPage on User {
    projects {
      id
      name
      description
      color
      boards {
        id
        name
        description
        project {
          id
        }
      }
      admin {
        id
        name
        icon
      }
      members {
        id
        name
        icon
      }
    }
  }
`;

type State = {
  projects: Project[];
};

@Component({
  selector: 'bis-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectPageComponent implements OnInit {
  readonly state$ = this.state.select();
  private readonly onInit$ = new Subject();

  readonly project: Project = {
    id: 'id',
    name: 'name',
    description: 'description',
    color: COLOR.Red,
    admin: {
      id: 'id',
      name: 'admin name',
    },
    members: [
      {
        id: 'user0001',
        name: 'user name 0001',
      },
    ],
  };

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery
  ) {}

  ngOnInit() {
    this.setupEventHandler();
    this.onInit$.next();
  }

  private setupEventHandler() {
    this.state.connect(
      'projects',
      this.apolloDataQuery
        .queryViewer({
          name: 'ViewerPartsInProjectPage',
          fields: VIEWER_FIELDS,
        })
        .pipe(
          map((response) => {
            const { viewer } = response.data;
            return (
              viewer?.projects.map(
                convertToFrontendDomainProjectFromApiProject
              ) ?? []
            );
          })
        )
    );
  }
}
