import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  APOLLO_DATA_QUERY,
  CREATE_PROJECT_USECASE,
  IApolloDataQuery,
  ICreateProjectUsecase,
  IUpdateProjectMembersUsecase,
  UPDATE_PROJECT_MEMBERS_USECASE,
} from '@bison/frontend/application';
import { Color, User } from '@bison/shared/domain';
import {
  CreateProjectInput,
  UpdateProjectMembersInput,
} from '@bison/shared/schema';
import { RxState } from '@rx-angular/state';
import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { gql } from 'apollo-angular';
import { merge, Observable, Subject } from 'rxjs';
import { exhaustMap, filter, map, switchMap } from 'rxjs/operators';
import { convertToApiColorFromDomainColor } from '../../../util/convert-to-api-color-from-domain-color';
import { nonNullable } from '../../../util/custom-operators/non-nullable';
import { ChangedPropertyEvent } from '..//project-property-edit-form/project-property-edit-form.component';

const ME_FIELDS = gql`
  fragment MePartsInProjectCreateSheet on User {
    id
    name
    icon
  }
`;

const USER_FIELDS = gql`
  fragment UserPartsInProjectCreateSheet on User {
    id
    name
    icon
  }
`;

type State = {
  color: Color;
  projectName: string;
  projectDescription: string;
  me?: User;
  users: User[];
  members: User[];
  isSheetOpen: boolean;
};

@Component({
  selector: 'bis-project-create-sheet',
  templateUrl: './project-create-sheet.component.html',
  styleUrls: ['./project-create-sheet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class ProjectCreateSheetComponent implements OnInit {
  @Input() triggerEl?: HTMLElement;
  @Input() isOpened$ = new Subject<boolean>().asObservable();

  /**
   * State
   */
  readonly state$ = this.state.select();
  readonly isSheetOpen$ = this.state.select('isSheetOpen');

  /**
   * Event
   */
  readonly onChangedProjectProperty$ = new Subject<ChangedPropertyEvent>();
  readonly onClickedCreate$ = new Subject<void>();
  readonly onSelectedMembers$ = new Subject<User['id'][]>();
  readonly onClosedeSheet$ = new Subject<void>();
  readonly onOpenedSheet$ = new Subject<void>();

  constructor(
    private readonly state: RxState<State>,
    @Inject(TuiNotificationsService)
    private readonly notificationsService: TuiNotificationsService,
    @Inject(CREATE_PROJECT_USECASE)
    private readonly createProjectUsecase: ICreateProjectUsecase,
    @Inject(APOLLO_DATA_QUERY)
    private readonly apolloDataQuery: IApolloDataQuery,
    @Inject(UPDATE_PROJECT_MEMBERS_USECASE)
    private readonly updateProjectMembersUsecase: IUpdateProjectMembersUsecase
  ) {}

  ngOnInit(): void {
    this.state.set({
      color: 'Gray',
      isSheetOpen: false,
    });
    this.state.connect(this.onChangedProjectProperty$, (state, event) => {
      return {
        ...state,
        projectName: event.name,
        projectDescription: event.description,
        color: event.color,
      };
    });
    this.state.connect(
      'me',
      this.state.select('isSheetOpen').pipe(
        filter((v) => v),
        switchMap(() => {
          return this.queryMe$();
        })
      )
    );
    this.state.connect(
      'users',
      this.state.select('isSheetOpen').pipe(
        filter((v) => v),
        switchMap(() => {
          return this.queryUsers$();
        })
      )
    );
    this.state.connect('members', this.onSelectedMembers$, (state, userIds) => {
      return userIds
        .map((id) => state.users.find((v) => v.id === id))
        .filter((v): v is User => v != null);
    });
    this.state.hold(
      this.onClickedCreate$.pipe(
        exhaustMap(() => this.mutateCreateProject$(this.state.get()))
      )
    );
    this.state.connect('isSheetOpen', this.onOpenedSheet$, () => true);
    this.state.connect('isSheetOpen', this.isOpened$);
    this.state.connect(this.onClosedeSheet$, () => {
      return {
        color: 'Gray',
        projectName: undefined,
        projectDescription: undefined,
        members: [],
        isSheetOpen: false,
      };
    });
  }

  private queryMe$() {
    return this.apolloDataQuery
      .queryViewer({ name: 'MePartsInProjectCreateSheet', fields: ME_FIELDS })
      .pipe(
        map((response) => response.data?.viewer),
        nonNullable(),
        map((viewer) => {
          return {
            id: viewer.id,
            name: viewer.name,
            icon: viewer.icon,
          };
        })
      );
  }

  private queryUsers$(): Observable<User[]> {
    return this.apolloDataQuery
      .queryUsers({
        name: 'UserPartsInProjectCreateSheet',
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

  private mutateCreateProject$(state: State) {
    if (state.me?.id == null) {
      throw new Error('me is undefined');
    }
    const input: CreateProjectInput = {
      name: state.projectName,
      description: state.projectDescription,
      color: convertToApiColorFromDomainColor(state.color),
      adminUserId: state.me?.id,
    };
    this.state.set('isSheetOpen', () => false);
    return merge(
      this.notificationsService.show('プロジェクトが作成されました', {
        // SuccessとErrorを指定すると、背景色の要素が一番手前に来て、通知内容が隠れてしまう
        // taiga-uiのバグ?
        status: TuiNotification.Info,
        hasCloseButton: true,
      }),
      this.createProjectUsecase.execute(input).pipe(
        map((result) => result.data?.createProject),
        nonNullable(),
        switchMap((project) => {
          const memberIds = state.members.map((v) => v.id);
          const input: UpdateProjectMembersInput = {
            projectId: project.id,
            addUserIds: memberIds,
            removeUserIds: [],
          };
          return this.updateProjectMembersUsecase.execute(input, memberIds);
        })
      )
    );
  }
}
