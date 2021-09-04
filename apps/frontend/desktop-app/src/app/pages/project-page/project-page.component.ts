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
import { merge, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  PROJECT_FIELDS,
  PROJECT_FRAGMENT_NAME,
} from '../../shared/fragments/project-fragment';
import { convertToFrontendDomainProjectFromApiProject } from '../../util/convert-to-frontend-domain-project-from-api-project';

export const VIEWER_FIELDS = gql`
  ${PROJECT_FIELDS}
  fragment ViewerPartsInProjectPage on User {
    projects {
      ...${PROJECT_FRAGMENT_NAME}
    }
  }
`;

type State = {
  projects: Project[];
  projectDeleteDialog: Partial<DeleteProject> & { isOpen: boolean };
  boardDeleteDialog: Partial<DeleteBoard> & { isOpen: boolean };
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
  readonly isOpenProjectDeleteDialog$ = this.state.select(
    'projectDeleteDialog',
    'isOpen'
  );
  readonly isOpenBoardDeleteDialog$ = this.state.select(
    'boardDeleteDialog',
    'isOpen'
  );

  // TODO: ボード編集
  // TODO: ボード作成
  // プロジェクト削除
  readonly onClickedDeleteProjectButton$ = new Subject<DeleteProject>();
  readonly onClosedProjectDeleteDialog$ = new Subject<void>();
  // ボード削除
  readonly onClickedDeleteBoardButton$ = new Subject<DeleteBoard>();
  readonly onClosedBoardDeleteDialog$ = new Subject<void>();

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
      projectDeleteDialog: { isOpen: false },
      boardDeleteDialog: { isOpen: false },
    });
    this.state.connect(
      'projectDeleteDialog',
      this.onClickedDeleteProjectButton$,
      (_, event) => ({
        project: event.project,
        isOpen: true,
      })
    );
    this.state.connect(
      'projectDeleteDialog',
      this.onClosedProjectDeleteDialog$,
      () => ({ isOpen: false })
    );
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
    merge(this.onHeaderHeightChanged$)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe();
    this.setupEventHandler();
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

type DeleteProject = { project: Project };
type DeleteBoard = { project: Project; board: Board };
