import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
} from '@bison/frontend/application';
import { Project } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  PROJECT_FIELDS,
  PROJECT_FRAGMENT_NAME,
} from '../../../../shared/fragments/project-fragment';
import { convertToFrontendDomainProjectFromApiProject } from '../../../../util/convert-to-frontend-domain-project-from-api-project';
import { nonNullable } from '../../../../util/custom-operators/non-nullable';

type State = {
  project?: Project;
};

@Component({
  selector: 'bis-project-detail-header',
  templateUrl: './project-detail-header.component.html',
  styleUrls: ['./project-detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectDetailHeaderComponent implements OnInit {
  readonly state$ = this.state.select();
  readonly isOpenedDeleteProjectDialog$ = new Subject<boolean>();
  private readonly projectId$ = (
    this.route.parent?.params ?? of({} as Params)
  ).pipe(
    // FIXME: stringであることを推論させる
    map((params) => params.projectId as string),
    nonNullable()
  );

  readonly onDeleteProject$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery
  ) {
    this.state.set({});
  }

  ngOnInit(): void {
    this.state.connect('project', this.queryProject$());
    this.state.hold(this.onDeleteProject$, () => {
      this.router.navigate(['projects']);
    });
  }

  private queryProject$() {
    return this.projectId$.pipe(
      switchMap((projectId) => {
        return this.apolloDataQuery.queryProject(
          { name: PROJECT_FRAGMENT_NAME, fields: PROJECT_FIELDS },
          projectId,
          { fetchPolicy: 'cache-only' }
        );
      }),
      map((response) => response?.data?.project),
      nonNullable(),
      map((project) => {
        return convertToFrontendDomainProjectFromApiProject(project);
      })
    );
  }
}
