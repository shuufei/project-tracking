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
import { of, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import {
  PROJECT_FIELDS,
  PROJECT_FRAGMENT_NAME,
} from '../../../../shared/fragments/project-fragment';
import { convertToFrontendDomainProjectFromApiProject } from '../../../../util/convert-to-frontend-domain-project-from-api-project';
import { nonNullable } from '../../../../util/custom-operators/non-nullable';

type State = {
  project?: Project;
  actionTargetBoard?: Project['boards'][number];
};

@Component({
  selector: 'bis-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectDetailComponent implements OnInit {
  /**
   * State
   */
  readonly state$ = this.state.select();
  private readonly projectId$ = (
    this.route.parent?.params ?? of({} as Params)
  ).pipe(
    // FIXME: stringであることを推論させる
    map((params) => params.projectId as string),
    nonNullable()
  );
  readonly isOpenedEditBoardSheet$ = new Subject<boolean>();
  readonly isOpenedDeleteBoardDialog$ = new Subject<boolean>();

  /**
   * Event
   */
  readonly onClickedEditBoard$ = new Subject<Project['boards'][number]>();
  readonly onClickedDeleteBoard$ = new Subject<Project['boards'][number]>();

  constructor(
    private state: RxState<State>,
    private route: ActivatedRoute,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery
  ) {
    this.state.set({});
  }

  ngOnInit() {
    this.state.connect('project', this.queryProject$());
    this.state.hold(
      this.onClickedEditBoard$.pipe(
        tap((board) => {
          this.state.set('actionTargetBoard', () => board);
          this.isOpenedEditBoardSheet$.next(true);
        })
      )
    );
    this.state.hold(
      this.onClickedDeleteBoard$.pipe(
        tap((board) => {
          this.state.set('actionTargetBoard', () => board);
          this.isOpenedDeleteBoardDialog$.next(true);
        })
      )
    );
  }

  private queryProject$() {
    return this.projectId$.pipe(
      switchMap((projectId) => {
        return this.apolloDataQuery.queryProject(
          { name: PROJECT_FRAGMENT_NAME, fields: PROJECT_FIELDS },
          projectId
        );
      }),
      map((response) => response?.data?.project),
      nonNullable(),
      map((project) => {
        return convertToFrontendDomainProjectFromApiProject(project);
      }),
      nonNullable()
    );
  }
}
