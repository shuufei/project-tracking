import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Project } from '@bison/frontend/domain';
import { User } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { Apollo, gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertToFrontendDomainProjectFromApiProject } from '../../util/convert-to-frontend-domain-project-from-api-project';

export const PROJECT_PAGE_QUERY = gql`
  query ProjectPageQuery {
    viewer {
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
  selector: 'bis-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectPageComponent implements OnInit {
  readonly state$ = this.state.select();
  private readonly onInit$ = new Subject();

  constructor(private state: RxState<State>, private apollo: Apollo) {}

  ngOnInit() {
    this.setupEventHandler();
    this.onInit$.next();
  }

  private setupEventHandler() {
    this.state.connect(
      'projects',
      this.apollo
        .watchQuery<{ viewer: User }>({
          query: PROJECT_PAGE_QUERY,
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
