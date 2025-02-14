import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  APOLLO_DATA_QUERY,
  IApolloDataQuery,
  IUpdateProjectUsecase,
  UPDATE_PROJECT_USECASE,
} from '@bison/frontend/application';
import { Project } from '@bison/frontend/domain';
import { User } from '@bison/shared/domain';
import { UpdateProjectInput } from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { gql } from 'apollo-angular';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, exhaustMap, filter, map, switchMap } from 'rxjs/operators';
import { convertToApiColorFromDomainColor } from '../../../util/convert-to-api-color-from-domain-color';

const USER_FIELDS = gql`
  fragment UserPartsInProjectAdminUpdateSheet on User {
    id
    name
    icon
  }
`;

export const PROJECT_PARTS = gql`
  fragment ProjectPartsInProjectAdminUpdateSheet on Project {
    id
    admin {
      id
      name
      icon
    }
  }
`;

type State = {
  project?: Project;
  users: User[];
  isSheetOpen: boolean;
};

@Component({
  selector: 'bis-project-admin-update-sheet',
  templateUrl: './project-admin-update-sheet.component.html',
  styleUrls: ['./project-admin-update-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectAdminUpdateSheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input()
  set project(value: Project) {
    this.state.set('project', () => value);
  }

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly isOpenedSheet$ = new Subject<boolean>();

  /**
   * Event
   */
  readonly onSelectedUser$ = new Subject<User['id']>();
  readonly onClickedUpdate$ = new Subject<void>();
  readonly onClosedeSheet$ = new Subject<void>();
  readonly onOpenedSheet$ = new Subject<void>();

  constructor(
    private state: RxState<State>,
    @Inject(APOLLO_DATA_QUERY) private apolloDataQuery: IApolloDataQuery,
    @Inject(UPDATE_PROJECT_USECASE)
    private readonly updateProjectUsecase: IUpdateProjectUsecase,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService
  ) {
    this.state.set({
      users: [],
      isSheetOpen: false,
    });
  }

  ngOnInit(): void {
    this.state.connect(
      'users',
      this.state.select('isSheetOpen').pipe(
        filter((v) => v),
        switchMap(() => {
          return this.queryUsers$();
        })
      )
    );
    this.state.connect('project', this.onSelectedUser$, (state, userId) => {
      const user = state.users.find((v) => v.id === userId);
      return user == null
        ? state.project
        : state.project && {
            ...state.project,
            admin: user,
          };
    });
    this.state.connect('isSheetOpen', this.onOpenedSheet$, () => true);
    this.state.connect(this.onClosedeSheet$, () => {
      return {
        isSheetOpen: false,
      };
    });
    this.state.hold(
      this.onClickedUpdate$.pipe(
        exhaustMap(() => {
          const project = this.state.get('project');
          if (project == null) return of(undefined);
          const input: UpdateProjectInput = {
            id: project.id,
            name: project.name,
            description: project.description,
            color: convertToApiColorFromDomainColor(project.color),
            adminUserId: project.admin.id,
          };
          this.isOpenedSheet$.next(false);
          return merge(
            this.updateProjectUsecase.execute(input),
            this.notificationsService.show(
              'プロジェクトの管理者を変更しました',
              { hasCloseButton: true }
            )
          );
        }),
        catchError((error) => {
          console.error(error);
          this.isOpenedSheet$.next(false);
          // FIXME: statusをerrorにしたいが、errorにすると表示がバグってる
          return this.notificationsService.show(
            'プロジェクト管理者の更新に失敗しました',
            { hasCloseButton: true, status: TuiNotification.Warning }
          );
        })
      )
    );
  }

  private queryUsers$(): Observable<User[]> {
    return this.apolloDataQuery
      .queryUsers({
        name: 'UserPartsInProjectAdminUpdateSheet',
        fields: USER_FIELDS,
      })
      .pipe(
        map((response) => {
          const { users } = response.data;
          return users.map((user) => {
            return {
              id: user.id,
              name: user.name,
              icon: user.icon,
            };
          });
        })
      );
  }
}
