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
import { Board, Project } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  BOARD_FIELDS,
  BOARD_FRAGMENT_NAME,
} from '../../../../shared/fragments/board-fragment';
import {
  PROJECT_FIELDS,
  PROJECT_FRAGMENT_NAME,
} from '../../../../shared/fragments/project-fragment';
import { convertToDomainBoardFromApiBoard } from '../../../../util/convert-to-domain-board-from-api-board';
import { convertToFrontendDomainProjectFromApiProject } from '../../../../util/convert-to-frontend-domain-project-from-api-project';
import { nonNullable } from '../../../../util/custom-operators/non-nullable';

type State = {
  project?: Project;
  board?: Board;
};

@Component({
  selector: 'bis-board-detail-header',
  templateUrl: './board-detail-header.component.html',
  styleUrls: ['./board-detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class BoardDetailHeaderComponent implements OnInit {
  readonly state$ = this.state.select();
  readonly isOpenedUpdateBoardSheet$ = new Subject<boolean>();
  readonly isOpenedDeleteBoardDialog$ = new Subject<boolean>();
  private readonly projectId$ = (
    this.route.parent?.params ?? of({} as Params)
  ).pipe(
    map((params) => params.projectId as string),
    nonNullable()
  );
  private readonly boardId$ = (this.route?.params ?? of({} as Params)).pipe(
    map((params) => params.boardId as string),
    nonNullable()
  );

  readonly onDeleteBoard$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    private router: Router,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    public route: ActivatedRoute
  ) {
    this.state.set({});
  }

  ngOnInit() {
    this.state.connect('project', this.queryProject$());
    this.state.connect('board', this.queryBoard$());
    this.state.hold(this.onDeleteBoard$, () => {
      this.router.navigate(
        [
          {
            outlets: {
              primary: 'detail',
              header: 'detail',
            },
          },
        ],
        { relativeTo: this.route.parent }
      );
    });
  }

  private queryProject$() {
    return this.projectId$.pipe(
      switchMap((projectId) => {
        return this.apolloDataQuery.queryProject(
          { name: PROJECT_FRAGMENT_NAME, fields: PROJECT_FIELDS },
          projectId
        );
      }),
      map((response) => response.data.project),
      nonNullable(),
      map((project) => {
        return convertToFrontendDomainProjectFromApiProject(project);
      })
    );
  }

  private queryBoard$() {
    return this.boardId$.pipe(
      switchMap((boardId) => {
        return this.apolloDataQuery.queryBoard(
          { name: BOARD_FRAGMENT_NAME, fields: BOARD_FIELDS },
          boardId
        );
      }),
      map((response) => response.data.board),
      nonNullable(),
      map((board) => {
        return convertToDomainBoardFromApiBoard(board);
      })
    );
  }
}
