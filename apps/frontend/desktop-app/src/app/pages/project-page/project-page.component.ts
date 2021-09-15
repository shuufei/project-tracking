import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
} from '@bison/frontend/application';
import { Board, Project } from '@bison/frontend/domain';
import { RxState } from '@rx-angular/state';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import {
  PROJECT_FIELDS,
  PROJECT_FRAGMENT_NAME,
} from '../../shared/fragments/project-fragment';
import { convertToFrontendDomainProjectFromApiProject } from '../../util/convert-to-frontend-domain-project-from-api-project';
import { nonNullable } from '../../util/custom-operators/non-nullable';

const VIEWER_FIELDS = gql`
  ${PROJECT_FIELDS}
  fragment ViewerPartsInProjectPage on User {
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
  projectDeleteDialogState?: { project: Project };
  boardDeleteDialog: Partial<DeleteBoard> & { isOpen: boolean };
  boardCreateSheetState?: { project: Project };
};

@Component({
  selector: 'bis-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectPageComponent
  implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('header') header?: ElementRef<HTMLElement>;
  @ViewChild('sideNav') sideNav?: ElementRef<HTMLElement>;

  readonly state$ = this.state.select();
  readonly isOpenBoardDeleteDialog$ = this.state.select(
    'boardDeleteDialog',
    'isOpen'
  );
  readonly isOpenedProjectCreateSheet$ = new Subject<boolean>();
  readonly isOpenedBoardCreateSheet$ = new Subject<boolean>();
  readonly isOpenedProjectDeleteDialog$ = new Subject<boolean>();

  readonly onClickedProjectDeleteButton$ = new Subject<DeleteProject>();
  readonly onClickedDeleteBoardButton$ = new Subject<DeleteBoard>();
  readonly onClosedBoardDeleteDialog$ = new Subject<void>();
  readonly onClickedBoardCreateButton$ = new Subject<{ project: Project }>();

  private readonly afterViewChecked$ = new Subject();
  private readonly onDestroy$ = new Subject();

  private readonly onHeaderHeightChanged$ = this.afterViewChecked$.pipe(
    map(() => this.header?.nativeElement.offsetHeight ?? 0),
    distinctUntilChanged(),
    // 短時間で複数回ヘッダーの高さが変わるとガクつくためdebounce
    debounceTime(100),
    tap(() => this.setSideNavOffset())
  );

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery
  ) {}

  ngOnInit() {
    this.state.set({
      projects: [],
      boardDeleteDialog: { isOpen: false },
    });
    this.state.connect(
      'boardDeleteDialog',
      this.onClickedDeleteBoardButton$,
      (_, event) => ({
        project: event.project,
        board: event.board,
        isOpen: true,
      })
    );
    this.state.connect(
      'boardDeleteDialog',
      this.onClosedBoardDeleteDialog$,
      () => ({
        isOpen: false,
      })
    );
    this.state.hold(this.onHeaderHeightChanged$);
    this.state.connect(
      'projects',
      this.apolloDataQuery
        .queryViewer({
          name: 'ViewerPartsInProjectPage',
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
    this.state.hold(
      this.onClickedBoardCreateButton$.pipe(
        tap(({ project }) => {
          this.state.set('boardCreateSheetState', () => ({ project }));
          this.isOpenedBoardCreateSheet$.next(true);
        })
      )
    );
    this.state.hold(
      this.onClickedProjectDeleteButton$.pipe(
        tap(({ project }) => {
          this.state.set('projectDeleteDialogState', () => ({ project }));
          this.isOpenedProjectDeleteDialog$.next(true);
        })
      )
    );
  }

  ngAfterViewChecked() {
    this.afterViewChecked$.next();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  private setSideNavOffset() {
    if (!this.header || !this.sideNav) {
      return;
    }
    const headerHeight = this.header.nativeElement.offsetHeight;
    this.sideNav.nativeElement.style.top = `${headerHeight}px`;
  }
}

type DeleteProject = { project: Project };
type DeleteBoard = { project: Project; board: Board };
