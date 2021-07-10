import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Project } from '@bison/frontend/domain';
import { User as ApiUser } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { Apollo, gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertToFrontendDomainProjectFromApiProject } from '../../util/convert-to-frontend-domain-project-from-api-project';
import { ME_FIELDS } from './components/project-create-sheet/project-create-sheet.component';

export const PROJECT_LIST_PAGE_QUERY = gql`
  ${ME_FIELDS}
  query ProjectListPageQuery {
    viewer {
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

  readonly onClickedCreateNewProject$ = new Subject();

  readonly onClickedDeleteProject$ = new Subject<Project>();

  private readonly onInit$ = new Subject();

  constructor(private state: RxState<State>, private apollo: Apollo) {
    this.state.set({
      projects: [],
    });
    // TODO: プロジェクト作成ダイアログを表示
    this.state.hold(this.onClickedCreateNewProject$, () => {
      return;
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
    this.state.connect(
      'projects',
      this.apollo
        .watchQuery<{ viewer: ApiUser }>({
          query: PROJECT_LIST_PAGE_QUERY,
        })
        .valueChanges.pipe(
          map((response) => {
            const { viewer } = response.data;
            return viewer.projects.map(
              convertToFrontendDomainProjectFromApiProject
            );
          })
        )
    );
  }
}
