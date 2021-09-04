import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
} from '@bison/frontend/application';
import { Project } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { of } from 'rxjs';
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
  selector: 'bis-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectDetailComponent implements OnInit {
  // State
  readonly state$ = this.state.select();
  private readonly projectId$ = (
    this.route.parent?.params ?? of({} as Params)
  ).pipe(
    // FIXME: stringであることを推論させる
    map((params) => params.projectId as string),
    nonNullable()
  );

  constructor(
    private state: RxState<State>,
    private route: ActivatedRoute,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery
  ) {
    this.state.set({});
  }

  ngOnInit() {
    this.state.connect('project', this.queryProject$());
  }

  private queryProject$() {
    return this.projectId$.pipe(
      switchMap((projectId) => {
        return this.apolloDataQuery.queryProject(
          { name: PROJECT_FRAGMENT_NAME, fields: PROJECT_FIELDS },
          projectId
        );
      }),
      map((result) => {
        return (
          result.data.project &&
          convertToFrontendDomainProjectFromApiProject(result.data.project)
        );
      }),
      nonNullable()
    );
  }
}
