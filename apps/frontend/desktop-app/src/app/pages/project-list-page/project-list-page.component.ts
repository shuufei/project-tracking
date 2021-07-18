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
import { convertToFrontendDomainProjectFromApiProject } from '../../util/convert-to-frontend-domain-project-from-api-project';
import { ME_FIELDS } from './components/project-create-sheet/project-create-sheet.component';

export const VIEWER_FIELD = gql`
  ${ME_FIELDS}
  fragment ViewerParts on User {
    ...MeParts
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
  selector: 'bis-project-list-page',
  templateUrl: './project-list-page.component.html',
  styleUrls: ['./project-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectListPageComponent implements OnInit {
  readonly state$ = this.state.select();

  readonly onClickedDeleteProject$ = new Subject<Project>();

  private readonly onInit$ = new Subject();

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY)
    private readonly apolloDataQuery: IApolloDataQuery
  ) {
    this.state.set({
      projects: [],
    });
    // TODO: プロジェクト削除ダイアログを表示
    this.state.hold(this.onClickedDeleteProject$, () => {
      return;
    });
  }

  ngOnInit() {
    this.setupEventHandler();
    this.onInit$.next();
  }

  private setupEventHandler() {
    // Application ServiceレイヤのQueryを利用する
    this.state.connect(
      'projects',
      this.apolloDataQuery
        .queryViewer(
          { name: 'ViewerParts', fields: VIEWER_FIELD },
          { nextFetchPolicy: 'cache-only' }
        )
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
